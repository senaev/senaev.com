import { dirname } from 'path';

export function checkIfItIsNoteRelativeLink(href: string): boolean {
    // protection for links like "tel:123456" or "mailto:xxx@xxx.com"
    if (!href.startsWith('./')) {
        return false;
    }

    return dirname(href) === '.';
}
