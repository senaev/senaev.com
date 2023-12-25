

const EXAMPLE_PLACEHOLDER = '<span style="font-size: 40px;">😅</span>';


const EXAMPLE_SEARCH_PARAMS = `?html=${encodeURIComponent(EXAMPLE_PLACEHOLDER)}`

const PLACEHOLDER_TEXT = `
Use "html" search parameter to place page content.
Example: <code>${EXAMPLE_SEARCH_PARAMS}</code>`


export default function Page(context: {
    searchParams: Record<string, string>;
}) {
    const {searchParams} = context;

    return (
        <div>
            <div dangerouslySetInnerHTML={{
                __html: searchParams.html ?? PLACEHOLDER_TEXT,
            }}/>
        </div>
    );
}
