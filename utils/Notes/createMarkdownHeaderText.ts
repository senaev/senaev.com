export type HeaderDepth = 1 | 2 | 3 | 4 | 5 | 6;

export function createMarkdownHeaderText({
    id,
    depth,
    text,
}: {
    id: string;
    depth: HeaderDepth;
    text: string;
}): string {
    return `<h${depth} class="MarkdownContainer_header" id="${id}">
      <a name="${id}" class="MarkdownContainer_anchor" href="#${id}">
        #
      </a>
      ${text}
    </h${depth}>`;
}
