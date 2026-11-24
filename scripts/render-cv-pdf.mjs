// Renders the CV pages of a running site to PDF, as a browser's "Save as PDF"
// does with default settings (no background graphics), plus a PNG of the first page.
// Usage: node scripts/render-cv-pdf.mjs <base URL> <output folder>
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import process from 'node:process';

const [
    baseUrl = 'http://localhost:3000',
    outDir = 'cv-pdf',
] = process.argv.slice(2);
const CV_IDS = [
    '5min',
    '1min',
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
    for (const id of CV_IDS) {
        const page = await browser.newPage({
            viewport: {
                width: 794,
                height: 1123,
            },
        });
        await page.goto(`${baseUrl}/cv/${id}`, { waitUntil: 'networkidle' });
        const title = await page.title();
        await page.pdf({
            path: `${outDir}/${title} (${id}).pdf`,
            preferCSSPageSize: true,
        });
        await page.emulateMedia({ media: 'print' });
        await page.screenshot({
            path: `${outDir}/${id}-print-preview.png`,
            fullPage: true,
        });
        // eslint-disable-next-line no-console
        console.log(`${id}: "${title}"`);
        await page.close();
    }
} finally {
    await browser.close();
}
