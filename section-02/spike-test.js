import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '1m',
            target: 20000
        },
        {
            duration: '1m',
            target: 0
        }
    ]
}

export default function () {
    http.get('http://test.k6.io');
    sleep(1)
    http.get('https://test.k6.io/contacts.php');
    sleep(2)
    http.get('https://test.k6.io/news.php');
    sleep(2)
}