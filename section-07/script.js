import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
    ext: {
        loadImpact: {
            projectID: 3692791
        }
    }
}

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}

// k6 run ./section-07/script.js --vus=1 --duration=10s --iterations=1
// k6 run ./section-07/script.js -u 1 -d 10s -i 1
// k6 run ./section-07/script.js --summary-export=summary.json
// k6 run ./section-07/script.js --out json=full_results.json