export function NOTES_REMOTE_URL(): string {
    const url = process.env.NOTES_REMOTE_URL;

    if (!url) {
        throw new Error('Environment variable NOTES_REMOTE_URL is not set');
    }

    return url;
}
