import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
    ext: {
        loadimpact: {
            projectID: 3692777
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
// k6 cloud ./section-06/first-script-02.js
