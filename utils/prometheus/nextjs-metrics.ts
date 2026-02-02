import { Counter, Registry } from 'prom-client';

declare global {
    // eslint-disable-next-line no-var
    var __nextjs_prometheus_registry__: Registry | undefined;
    // eslint-disable-next-line no-var
    var __nextjs_http_requests_total__: Counter<string> | undefined;
}

const g = globalThis;

let registry: Registry;
let nextjsHttpRequestsTotal: Counter<string>;

if (g.__nextjs_prometheus_registry__ && g.__nextjs_http_requests_total__) {
    registry = g.__nextjs_prometheus_registry__;
    nextjsHttpRequestsTotal = g.__nextjs_http_requests_total__;
} else {
    registry = new Registry();
    nextjsHttpRequestsTotal = new Counter({
        name: 'nextjs_http_requests_total',
        help: 'Total number of HTTP requests (page views)',
        labelNames: [
            'path',
            'method',
        ],
    });
    registry.registerMetric(nextjsHttpRequestsTotal);
    g.__nextjs_prometheus_registry__ = registry;
    g.__nextjs_http_requests_total__ = nextjsHttpRequestsTotal;
}

export { nextjsHttpRequestsTotal, registry as nextjsMetricsRegistry };
