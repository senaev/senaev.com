import { NextResponse } from 'next/server';
import { prometheus } from 'utils/prometheus/nextjs-metrics';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const metrics = await prometheus.registry.metrics();
        return new NextResponse(metrics, {
            headers: {
                'Content-Type': prometheus.registry.contentType,
            },
        });
    } catch (err) {
        return new NextResponse(
            `# Error collecting metrics: ${err instanceof Error ? err.message : String(err)}`,
            { status: 500 }
        );
    }
}
