import { promises } from 'fs';
import { resolve } from 'path';

export async function getAllFilesInFolder(rootDirectory: string, foldersToIgnore: Set<string>): Promise<Map<string, string>> {
    const filesMap = new Map<string, string>();
    const directoriesStack = [rootDirectory];

    while (directoriesStack.length) {
        const directory = directoriesStack.shift()!;

        const content = await promises.readdir(directory);

        for (const item of content) {
            const absolutePath = resolve(directory, item);

            const pathStats = await promises.stat(absolutePath);

            if (pathStats.isDirectory() && !foldersToIgnore.has(item)) {
                directoriesStack.push(absolutePath);
            } else {
                filesMap.set(item, absolutePath);
            }
        }
    }

    return filesMap;
}
