import { NextResponse } from 'next/server';
import { prometheusRegistry } from 'utils/prometheus/nextjs-metrics';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const metrics = await prometheusRegistry.metrics();
        return new NextResponse(metrics, {
            headers: {
                'Content-Type': prometheusRegistry.contentType,
            },
        });
    } catch (err) {
        return new NextResponse(
            `# Error collecting metrics: ${err instanceof Error ? err.message : String(err)}`,
            { status: 500 }
        );
    }
}
