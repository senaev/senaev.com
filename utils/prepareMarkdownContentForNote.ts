function replaceWikiLinksInTextWithRelativeLinks(text: string) {
    const regex = /\[\[([^\]]*)\]\]/gm;

    return text.replace(regex, function (match) {
        const withSquarePqrenthesisRemoved = match.substring(2, match.length - 2);

        const parts = withSquarePqrenthesisRemoved.split('|');

        let title = withSquarePqrenthesisRemoved;
        let link = withSquarePqrenthesisRemoved;

        if (parts.length > 1) {
            link = parts.shift()!;
            title = parts.join('|');
        }

        return `[${title}](./${encodeURIComponent(link)})`;
    });
}

export async function prepareMarkdownContentForNote(rawMarkdown: string): Promise<string> {
    return replaceWikiLinksInTextWithRelativeLinks(rawMarkdown);
}
