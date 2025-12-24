import { promises } from 'fs';

const FIRST_DELIMITER = '---\n';
const SECOND_DELIMITER = '\n---\n';

function removeFrontmatter(markdown: string): string {
    const trimmed = markdown.trim();

    if (!trimmed.startsWith(FIRST_DELIMITER)) {
        return markdown;
    }

    const secondDelimiter = trimmed.indexOf(SECOND_DELIMITER, FIRST_DELIMITER.length);

    if (secondDelimiter === -1) {
        return markdown;
    }

    return markdown.substring(secondDelimiter + SECOND_DELIMITER.length);
}

export async function getNoteByFilePath({
    filePath,
}: {
    filePath: string
}): Promise<string> {
    const fileContent = (await promises.readFile(filePath)).toString();

    const withoutFrontmatter = removeFrontmatter(fileContent);

    return withoutFrontmatter;
}
