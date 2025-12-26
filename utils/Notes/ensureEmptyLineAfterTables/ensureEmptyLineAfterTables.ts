/**
 * Ensures there's an empty line after markdown tables.
 *
 * The marked parser (https://www.npmjs.com/package/marked)
 * as well as github (https://gist.github.com/senaev/8e12787a3fa8a33e7cc133a076cce0bb)
 * may interpret text immediately following a table (without an empty line) as part of the table.
 * This function automatically adds an empty line after each table to prevent this behavior.
 *
 * It's necessary because Obsidian may not add an empty line after the table.
 */
export function ensureEmptyLineAfterTables(text: string): string {
    const lines = text.split('\n');
    const result: string[] = [];
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === undefined) {
            continue;
        }
        const isTableRow = /^\s*\|.*\|\s*$/.test(line);
        const isTableSeparator = /^\s*\|[\s\-:|]+\|\s*$/.test(line);

        if (isTableRow || isTableSeparator) {
            inTable = true;
            result.push(line);
        } else {
            if (inTable && line.trim() !== '') {
                const lastLine = result[result.length - 1];
                if (result.length > 0 && lastLine !== undefined && lastLine.trim() !== '') {
                    result.push('');
                }
            }
            inTable = false;
            result.push(line);
        }
    }

    return result.join('\n');
}
