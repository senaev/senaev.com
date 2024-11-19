import { dirname } from 'path';

export function checkIfItIsNoteRelativeLink(href: string): boolean {
    return dirname(href) === '.';
}
