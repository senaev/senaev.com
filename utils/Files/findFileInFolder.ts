import { promises } from 'fs';
import { resolve } from 'path';

export async function findFileInFolder(rootDirectory: string, expectedFileName: string): Promise<string | undefined> {
    const directoriesStack = [rootDirectory];

    while (directoriesStack.length) {
        const directory = directoriesStack.shift()!;

        const content = await promises.readdir(directory);

        for (const item of content) {
            const absolutePath = resolve(directory, item);

            const pathStats = await promises.stat(absolutePath);

            if (pathStats.isDirectory()) {
                directoriesStack.push(absolutePath);
            } else if (item === expectedFileName) {
                return absolutePath;
            }
        }
    }

    return undefined;
}
