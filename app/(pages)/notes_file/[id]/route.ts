import { NOTES_FOLDER } from 'const/NOTES_FOLDER';
import { readFileSync } from 'fs';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { basename } from 'path';
import { pathExists } from 'path-exists';
import { findFileInFolder } from 'utils/Files/findFileInFolder';

export async function GET(request: Request): Promise<NextResponse> {
    const decodedId = decodeURIComponent(basename(request.url));

    const doesNotesDirectoryExist = await pathExists(NOTES_FOLDER);
    if (!doesNotesDirectoryExist) {
        return notFound();
    }

    const file = await findFileInFolder(NOTES_FOLDER, decodedId);

    if (!file || !file.isInPublicFolder) {
        return notFound();
    }

    const imageBuffer = readFileSync(file.path);

    return new NextResponse(imageBuffer, { status: 200, statusText: 'OK' });
}
