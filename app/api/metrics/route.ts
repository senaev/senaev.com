import { NextResponse } from 'next/server';
import { nextjsMetricsRegistry } from 'utils/prometheus/nextjs-metrics';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const metrics = await nextjsMetricsRegistry.metrics();
        return new NextResponse(metrics, {
            headers: {
                'Content-Type': nextjsMetricsRegistry.contentType,
            },
        });
    } catch (err) {
        return new NextResponse(
            `# Error collecting metrics: ${err instanceof Error ? err.message : String(err)}`,
            { status: 500 }
        );
    }
}
