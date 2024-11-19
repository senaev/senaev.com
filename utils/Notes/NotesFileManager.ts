import { relative } from 'path';
import { pathExists } from 'path-exists';
import { getAllFilesInFolder } from 'utils/Files/getAllFilesInFolder';

const FOLDERS_TO_IGNORE = new Set([
    '.git',
    '.obsidian',
    '.trash',
    '.trash',
]);

const PUBLIC_FOLDER_NAME = 'public';




export class NotesFileManager {
    private filesMap = new Map<string, string>();

    constructor(private readonly rootDirectory: string) { }

    private async rescan(): Promise<void> {
        this.filesMap = await getAllFilesInFolder(this.rootDirectory, FOLDERS_TO_IGNORE);
    }

    public async findFile(fileName: string): Promise<{
        path: string;
        isInPublicFolder: boolean;
    } | undefined> {
        const path = await this.findFileInternal(fileName);

        if (path) {
            return {
                path,
                isInPublicFolder: this.isNotePathPublic(path),
            };
        }

        return undefined;
    }

    public isNotePublic(fileName: string): boolean {
        const path = this.filesMap.get(fileName);

        if (!path) {
            return false;
        }

        return this.isNotePathPublic(path);
    }

    private isNotePathPublic(path: string): boolean {
        const relativePath = relative(this.rootDirectory, path);

        return relativePath.startsWith(`${PUBLIC_FOLDER_NAME}/`);
    }

    private async findFileInternal(fileName: string): Promise<string | undefined> {
        const cachedPath = this.filesMap.get(fileName);

        if (cachedPath) {
            // recheck if fiel still exists
            const isExist = await pathExists(cachedPath);

            if (isExist) {
                return cachedPath;
            }
        }

        await this.rescan();

        return this.filesMap.get(fileName);
    }
}
