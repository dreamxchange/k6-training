import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<300'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99']
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/b85e79b2-c13e-49bf-bc82-cabd17726a35');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get('https://run.mocky.io/v3/39314cfe-229e-4e01-95a1-bbfd50ac16cd?mocky-delay=1000ms', {
        tags: {
            page: 'order'
        }
    });

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, {
      'status is 201': (r) => r.status === 201
    }, { page: 'order' });

    sleep(1);
}
