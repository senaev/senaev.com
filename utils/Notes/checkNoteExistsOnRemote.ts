import { NOTES_REMOTE_URL } from 'const/NOTES_REMOTE_URL';

export async function checkNoteExistsOnRemote(noteName: string): Promise<boolean> {
    const url = `${NOTES_REMOTE_URL()}/?note=${encodeURIComponent(noteName)}`;

    try {
        const response = await fetch(url);
        void response.body?.cancel();
        return response.status === 200;
    } catch {
        return false;
    }
}
