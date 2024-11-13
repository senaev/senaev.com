import { promises } from 'fs';
import { relative, resolve } from 'path';

export async function findFileInFolder(rootDirectory: string, expectedFileName: string): Promise<{
    path: string;
    isInPublicFolder: boolean;
} | undefined> {
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

                const relativePath = relative(rootDirectory, absolutePath);
                const isInPublicFolder = relativePath.startsWith('public/');
                return {
                    path: absolutePath,
                    isInPublicFolder,
                };
            }
        }
    }

    return undefined;
}
