import { NOTES_FILE_MANAGER } from 'const/NOTES_FILE_MANAGER';
import { NOTES_FOLDER } from 'const/NOTES_FOLDER';
import { promises } from 'fs';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { basename } from 'path';
import { pathExists } from 'path-exists';

export async function GET(request: Request): Promise<NextResponse> {
    const decodedId = decodeURIComponent(basename(request.url));

    const doesNotesDirectoryExist = await pathExists(NOTES_FOLDER);
    if (!doesNotesDirectoryExist) {
        return notFound();
    }

    const file = await NOTES_FILE_MANAGER.findFile(decodedId);

    if (!file || !file.isInPublicFolder) {
        return notFound();
    }

    const imageBuffer = await promises.readFile(file.path);

    return new NextResponse(imageBuffer, { status: 200, statusText: 'OK' });
}
