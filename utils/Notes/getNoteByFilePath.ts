import { promises } from 'fs';
import { parse } from 'yaml';

export async function getNoteByFilePath({
    filePath,
}: {
    filePath: string
}): Promise<{
    markdownContent: string;
    yamlAttributes: ReturnType<typeof parse>;
}> {
    const fileContent = (await promises.readFile(filePath)).toString();

    let markdownContent = fileContent;

    let yamlAttributes = undefined;
    const mdPart = fileContent.split('---');
    if (mdPart[0] === '' && mdPart.length > 2) {
        yamlAttributes = parse(mdPart[1]!);

        markdownContent = mdPart.splice(2).join('\n');
    }

    return {
        markdownContent,
        yamlAttributes,
    };
}
