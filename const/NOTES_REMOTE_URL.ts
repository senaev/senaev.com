if (!process.env.NOTES_REMOTE_URL) {
    throw new Error('Environment variable NOTES_REMOTE_URL is not set');
}

export const NOTES_REMOTE_URL = process.env.NOTES_REMOTE_URL;
