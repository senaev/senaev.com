const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');

// Токен вашего Telegram-бота
const token = '######';
const chatId = -123456789;
const bot = new TelegramBot(token, { polling: true });

const NO_SLOT_TEXT = 'Sorry, all appointments for this service are currently booked. Please check again tomorrow for cancellations or new appointments.';

// Данные для входа на сайт
const login = '####@gmail.com'; // Замените на ваш логин
const password = '####'; // Замените на ваш пароль

// URL сайта посольства
const url = 'https://prenotami.esteri.it/Services';

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const browserSize = {
    width: 1080,
    height: 720,
};

// Функция для проверки наличия слотов
async function checkSlotAvailability() {
    console.log('start browser');
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [`--window-size=${browserSize.width},${browserSize.height}`],
    });


    const page = await browser.newPage();

    await page.setViewport({
        ...browserSize,
        deviceScaleFactor: 1,
        isMobile: false,
    });


    async function error(errorMessage) {
        // const html = await page.content();
        bot.sendMessage(chatId, `Error=[${errorMessage}]`);
    }


    try {
        // Переход на сайт
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Проверка наличия полей для логина
        const loginFieldExists = await page.evaluate(() => {
            return document.body.innerText.includes('Email') && document.body.innerText.includes('Password');
        });

        if (loginFieldExists) {
            await delay(1000);
            // Заполнение полей логина и пароля
            await page.type('input[name="Email"]', login);
            await delay(1000);
            await page.type('input[name="Password"]', password);
            await delay(1000);
            await page.click('button[type="submit"]');

            console.log('inputs filled');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        } else {
            throw new Error('no login fields');
        }

        console.log('Successfully login');

        await delay(1000);

        // Проверка наличия текстов для записи на визу
        const slotAvailable = await page.evaluate(() => {
            const service1 = document.body.innerText.includes('Termini vize za: TURIZAM (šalter_1)');
            const service2 = document.body.innerText.includes('Termini vize za : TURIZAM (шalter_2)');
            return service1 || service2;
        });

        console.log('Тексты записи на визу найдены');
        await delay(1000);


        if (!slotAvailable) {
            throw new Error('Тексты записи на визу НЕ найдены');
        }

        const content = await page.evaluate(() => {
            return document.body.innerText;
        });
        console.log('Page content]');

        await delay(1000);

        // Нажимаем кнопку "РЕЗЕРВИШИ"
        const buttons = await page.$$('button.primary');
        console.log(`Buttons.length=[${buttons.length}]`);

        const button = buttons[2];
        if (!button) {
            throw new Error(`Button has not been found, page content = [${content}]`);
        }
        console.log('Button found!');

        button.evaluate((el) => {
            el.style.fontSize = 50 + 'px';
            el.style.color = 'red';
        });


        await delay(2000);

        await button.click();
        console.log('Button clicked!');


        console.log('Wait for second navigation!');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Second navigation successfull');

        await delay(2000);

        const secondContent = await page.evaluate(() => {
            return document.body.innerText;
        });
        console.log('Page content]');

        if (secondContent.includes(NO_SLOT_TEXT)) {
            throw new Error('There is no slot!!!');
        }

        await delay(1000000);

        // await button.click();
        // await page.waitForTimeout(2000); // Ждём загрузки окна

        // // Проверяем, есть ли слоты
        // const slotMessage = await page.evaluate(() => {
        //     return document.body.innerText.includes('Sorry, all appointments for this service are currently booked.');
        // });

        // if (slotMessage) {
        //     console.log('Слотов нет');
        // } else {
        //     // Уведомление в Telegram
        //     bot.sendMessage(chatId, 'Есть свободный слот для записи на визу!');
        // }

    } catch (e) {
        error(`Ошибка при проверке наличия слотов [${e.message}]`);
    } finally {
        await browser.close();
    }
}



// // Запуск проверки раз в минуту
// setTimeout(checkSlotAvailability, 1000);
checkSlotAvailability();
