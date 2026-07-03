import { NOTES_REMOTE_URL } from 'const/NOTES_REMOTE_URL';

const FIRST_DELIMITER = '---\n';
const SECOND_DELIMITER = '\n---\n';

function removeFrontmatter(markdown: string): string {
    const trimmed = markdown.trim();

    if (!trimmed.startsWith(FIRST_DELIMITER)) {
        return markdown;
    }

    const secondDelimiter = trimmed.indexOf(SECOND_DELIMITER, FIRST_DELIMITER.length);

    if (secondDelimiter === -1) {
        return markdown;
    }

    return trimmed.substring(secondDelimiter + SECOND_DELIMITER.length);
}

export async function getNoteFromRemote(noteName: string): Promise<string | null> {
    const url = `${NOTES_REMOTE_URL()}/?note=${encodeURIComponent(noteName)}`;

    const response = await fetch(url);

    if (response.status === 404) {
        await response.body?.cancel();
        return null;
    }

    if (!response.ok) {
        await response.body?.cancel();
        throw new Error(`Failed to fetch note "${noteName}": HTTP ${response.status}`);
    }

    const content = await response.text();

    return removeFrontmatter(content);
}
