import { promises } from 'fs';
import { notFound } from 'next/navigation';
import { basename, resolve } from 'path';

const NOTES_FOLDER = process.env.NOTES_FOLDER || '/app/notes-folder';

async function findFileInDirectory(dir: string, expectedFileName: string): Promise<string | undefined> {
    const allFiles = await getFiles(dir);

    return allFiles.find((file) => {
        const fileName = basename(file);

        return fileName === expectedFileName;
    });
}

async function getFiles(dir: string): Promise<string[]> {
    const subdirs = await promises.readdir(dir);

    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = resolve(dir, subdir);

        return (await promises.stat(res)).isDirectory() ? getFiles(res) : [res];
    }));

    return files.reduce((a, f) => a.concat(f), []);
}

export default async function Page({
    params,
}: {
    params: Promise<{id: string}>}) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);


    const file = await findFileInDirectory(NOTES_FOLDER, `${decodedId}.md`);

    if (!file) {
        return notFound();
    }

    const fileContent = (await promises.readFile(file)).toString();

    const mdPart = fileContent.split('---');

    if (mdPart[0] !== '' || mdPart.length < 2) {
        return notFound();
    }

    const yamlPart = mdPart[1]!.split('\n');

    if (!yamlPart.includes('public: true')) {
        return notFound();
    }

    const content = mdPart.splice(2);

    return <div>
        {
            content
        }
    </div>;
}
