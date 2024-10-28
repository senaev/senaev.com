import { promises } from 'fs';
import { parse } from 'yaml';

export async function getNoteByFilePath({
    filePath,
}: {
    filePath: string
}): Promise<{
    markdownContent: string;
    isPublic: boolean;
}> {
    const fileContent = (await promises.readFile(filePath)).toString();

    let markdownContent = fileContent;
    let isPublic = false;

    const mdPart = fileContent.split('---');
    if (mdPart[0] === '' && mdPart.length > 2) {
        const yamlAttributes = parse(mdPart[1]!);
        if (yamlAttributes) {
            isPublic = yamlAttributes.public === true;
        }

        markdownContent = mdPart.splice(2).join('\n');
    }

    return {
        markdownContent,
        isPublic,
    };
}
