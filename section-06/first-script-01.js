import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}

// k6 cloud ./section-06/first-script.js
// k6 run ./section-06/first-script.js -o cloud