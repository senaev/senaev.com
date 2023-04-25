import * as fs from 'fs';
import path from 'path';

import { remark } from 'remark';
import html from 'remark-html';

export type MyselfHtmlFromReadme = {
    contentHtml: string;
};

export async function getMyselfDataFromReadme(): Promise<MyselfHtmlFromReadme> {
    const pagesDirectory = path.resolve(process.cwd(), 'pages');
    const fullPath = path.resolve(pagesDirectory, '../README.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(fileContents);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        contentHtml,
    };
}
