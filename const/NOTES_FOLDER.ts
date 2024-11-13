import { resolve } from 'path';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';

export const NOTES_FOLDER = process.env.NOTES_FOLDER || resolve(getNextJsRootDirectory(), 'notes-folder');
