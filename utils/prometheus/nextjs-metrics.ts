import 'utils/prometheus/nextjs-metrics';
import { Counter, register } from 'prom-client';

export const nextjsHttpRequestsTotal = new Counter({
    name: 'nextjs_http_requests_total',
    help: 'Total number of HTTP requests (page views)',
    labelNames: [
        'path',
        'method',
    ],
});

register.registerMetric(nextjsHttpRequestsTotal);
