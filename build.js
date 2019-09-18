const marked = require('marked');
const fs = require('fs');
const pdf = require('html-pdf');

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

const mdInHtml = marked(markdownString);

(async () => {
    const resultHtml = htmlTemplate.replace(TEMPLATE_STRING, mdInHtml)

    fs.writeFileSync('./dist/index.html', resultHtml, 'utf8');

    await new Promise((resolve, reject) => {
        pdf.create(mdInHtml, {
            "format": "A4",
            "border": '0.2in'
        }).toFile('./dist/index.pdf', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
})();
