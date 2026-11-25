// Renders the CV page of a running site to PDF, as a browser's "Save as PDF"
// does with default settings (no background graphics), saves screen and print
// previews, and checks that the old CV addresses redirect to /cv.
// Usage: node scripts/render-cv-pdf.mjs <base URL> <output folder>
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import process from 'node:process';

const [
    baseUrl = 'http://localhost:3000',
    outDir = 'cv-pdf',
] = process.argv.slice(2);
const OLD_CV_PATHS = [
    '/cv/5min',
    '/cv/1min',
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
    const page = await browser.newPage({
        viewport: {
            width: 794,
            height: 1123,
        },
    });
    await page.goto(`${baseUrl}/cv`, { waitUntil: 'networkidle' });
    const title = await page.title();
    await page.pdf({
        path: `${outDir}/${title}.pdf`,
        preferCSSPageSize: true,
    });
    await page.screenshot({
        path: `${outDir}/screen.png`,
        fullPage: true,
    });
    await page.emulateMedia({ media: 'print' });
    await page.screenshot({
        path: `${outDir}/print-preview.png`,
        fullPage: true,
    });
    // eslint-disable-next-line no-console
    console.log(`"${title}"`);

    for (const oldPath of OLD_CV_PATHS) {
        await page.goto(`${baseUrl}${oldPath}`);
        const pathname = new URL(page.url()).pathname;
        if (pathname !== '/cv') {
            throw new Error(`${oldPath} did not redirect to /cv: ${page.url()}`);
        }
    }
} finally {
    await browser.close();
}
