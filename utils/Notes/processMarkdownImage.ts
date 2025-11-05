import isNumber from 'is-number';
import { type Tokens } from 'marked';
import { basename } from 'path';
import { checkIfItIsNoteRelativeLink } from './checkIfItIsNoteRelativeLink';

function getMarkdownSizeByAnnotation(annotationRaw: string): {
    width?: string;
    height?: string;
} {
    const annotation = annotationRaw.trim();
    if (!annotation) {
        return {};
    }

    if (isNumber(annotation)) {
        return {
            width: annotation,
        };
    }

    const parts = annotation.split('x');
    if (parts.length === 2) {
        const [
            w,
            h,
        ] = parts;

        if (isNumber(w) && isNumber(h)) {
            return {
                width: w as string,
                height: h as string,
            };
        }
    }

    if (annotation.endsWith('%')) {
        const rawWidthInPercent = annotation.substring(0, annotation.length - 1);

        if (isNumber(rawWidthInPercent)) {
            return {
                width: annotation,
            };
        }
    }

    return {};
}

/**
 * Something is set as a title or size
 * supports descriptions like:
 * 300 (width)
 * 300x150 (width x heigth)
 * 100% (width 100%)
 */
function getMarkdownImageAttributes({
    href,
    annotation,
}: {
    href: string;
    annotation: string;
}): {
    src: string;
    width?: string;
    height?: string;
} {
    const isNoteRelativeLink = checkIfItIsNoteRelativeLink(href);
    const filename = decodeURIComponent(basename(href));

    // It's not a note's file
    if (!isNoteRelativeLink) {
        return {
            src: href,
        };
    }

    const src = `/notes_file/${filename}`;

    // Filename in attotation is a default behavior without annotation
    if (filename === annotation) {
        return {
            src,
        };
    }

    return {
        src,
        ...getMarkdownSizeByAnnotation(annotation),
    };
}

export function processMarkdownImage(input: Tokens.Image): string {
    const { href, text } = input;

    const {
        src, width, height,
    } = getMarkdownImageAttributes({
        href,
        annotation: text,
    });

    const attributes = Object
        .entries({
            src,
            width,
            height,
        })
        .filter(([
            , value,
        ]) => Boolean(value));

    const attributesString = attributes.map(([
        key,
        value,
    ]) => `${key}="${value}"`).join(' ');

    return `<img ${attributesString}>`;
}
