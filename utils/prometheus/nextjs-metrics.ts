import { Counter, Registry } from 'prom-client';

type NextjsPrometheusSingletone = {
    registry: Registry;
    counters: {
        nextjsHttpRequestsTotal: Counter<string>;
    }
};

declare global {
    // eslint-disable-next-line no-var
    var __nextjs_prometheus_singletone__: NextjsPrometheusSingletone | undefined;
}

const g = globalThis as {
    __nextjs_prometheus_singletone__: NextjsPrometheusSingletone | undefined;
};

let prometheus: NextjsPrometheusSingletone;

if (g.__nextjs_prometheus_singletone__) {
    prometheus = g.__nextjs_prometheus_singletone__;
} else {
    prometheus = {
        registry: new Registry(),
        counters: {
            nextjsHttpRequestsTotal: new Counter({
                name: 'nextjs_http_requests_total',
                help: 'Total number of HTTP requests (page views)',
                labelNames: [
                    'path',
                    'method',
                ],
            }),
        },
    };

    prometheus.registry.registerMetric(prometheus.counters.nextjsHttpRequestsTotal);
    g.__nextjs_prometheus_singletone__ = prometheus;
}

export const prometheusRegistry = prometheus.registry;
export const prometheusCounters = prometheus.counters;
