export function createCrossOriginHeaders(request: Request): Record<string, string> {
    return {
        'Access-Control-Allow-Origin': request.headers.get('origin') ?? '',
        'Access-Control-Allow-Credentials': 'true',
    };
}
