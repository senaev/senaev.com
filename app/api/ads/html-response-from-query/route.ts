import { NextResponse } from 'next/server'

const EXAMPLE_PLACEHOLDER = '<span style="font-size: 40px;">😅</span>'
const EXAMPLE_HEADERS = {
  'First-Header': 'first header value',
  'Second-Header': 'second header value'
}
const exampleHeadersString = Object.entries(EXAMPLE_HEADERS)
  .map(([key, value]) => `header=${encodeURIComponent(key)}:${encodeURIComponent(value)}`)
  .join('&')

const EXAMPLE_SEARCH_PARAMS = `?html=${encodeURIComponent(EXAMPLE_PLACEHOLDER)}&${exampleHeadersString}`

const PLACEHOLDER_TEXT = `
Use "html" search parameter to place page content and "header" to add required headers to response.
Example: <code>${EXAMPLE_SEARCH_PARAMS}</code>`

const MACROS = '{content}'

const TEMPLATE = `<!DOCTYPE html> 
<html>
<body>
${MACROS}
</body> 
</html>`

export function GET (request: Request): NextResponse {
  const { searchParams } = new URL(request.url)
  const htmlContent = searchParams.get('html') ?? PLACEHOLDER_TEXT

  const responseHeadersFromRequest: Record<string, string> = {}
  searchParams.getAll('header').forEach((header) => {
    const [key, value] = header.split(':')

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!key || !value) {
      throw new Error(`Header key of value is wrong in header=[${header}] in url=[${request.url}]`)
    }

    responseHeadersFromRequest[key] = value
  })

  return new NextResponse(TEMPLATE.replace(MACROS, htmlContent), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...responseHeadersFromRequest
    }
  })
}
