const marked = require('marked');
const fs = require('fs');
const pdf = require('html-pdf');
const multilang = require('multilang');

const TEMPLATE_STRING = '<!--content-->';

const htmlTemplate = fs.readFileSync('./template.html', 'utf8');
const markdownString = fs.readFileSync('./README.md', 'utf8');

marked.setOptions({
    pedantic: false,
    gfm: true,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

const ruMd = multilang.changeDoc(markdownString,'ru');
const enMd = multilang.changeDoc(markdownString,'en');

const ruHtml = marked(ruMd);
const enHtml = marked(enMd);

function writePdf(lang, mdString) {
    return new Promise((resolve, reject) => {
        pdf.create(mdString, {
            "format": "A4",
            "border": '0.2in'
        }).toFile(`./dist/${lang}.pdf`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}


(async () => {
    const resultHtmlRu = htmlTemplate.replace(TEMPLATE_STRING, ruHtml);
    const resultHtmlEn = htmlTemplate.replace(TEMPLATE_STRING, enHtml);

    fs.writeFileSync('./dist/ru.html', resultHtmlRu, 'utf8');
    fs.writeFileSync('./dist/en.html', resultHtmlEn, 'utf8');

    fs.writeFileSync('./dist/ru.md', ruMd, 'utf8');
    fs.writeFileSync('./dist/en.md', enMd, 'utf8');

    await writePdf('ru', resultHtmlRu);
    await writePdf('en', resultHtmlEn);
})();
