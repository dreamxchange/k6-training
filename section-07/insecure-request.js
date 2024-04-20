import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    http.get('https://self-signed.badssl.com/');
    sleep(1);
}

// k6 run ./section-07/insecure-request.js --insecure-skip-tls-verify
