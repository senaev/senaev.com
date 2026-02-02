import { Counter, Registry } from 'prom-client';

type NextjsPrometheusSingletone = {
    registry: Registry;
    nextjsHttpRequestsTotal: Counter<string>;
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
        nextjsHttpRequestsTotal: new Counter({
            name: 'nextjs_http_requests_total',
            help: 'Total number of HTTP requests (page views)',
            labelNames: [
                'path',
                'method',
            ],
        }),
    };

    prometheus.registry.registerMetric(prometheus.nextjsHttpRequestsTotal);
    g.__nextjs_prometheus_singletone__ = prometheus;
}

export { prometheus };
