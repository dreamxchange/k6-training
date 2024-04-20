import http from 'k6/http';

export default function () {

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}

// k6 run -e BASE_URL=https://test.k6.io section-05/env-var.js