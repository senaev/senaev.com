import { NextResponse } from 'next/server';
import { register } from 'prom-client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const metrics = await register.metrics();
        return new NextResponse(metrics, {
            headers: {
                'Content-Type': register.contentType,
            },
        });
    } catch (err) {
        return new NextResponse(
            `# Error collecting metrics: ${err instanceof Error ? err.message : String(err)}`,
            { status: 500 }
        );
    }
}
