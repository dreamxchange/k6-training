import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const credentials = {
        username: `user_${Date.now()}`,
        password: `secret_${Date.now()}`,
    }

    const headers = {
        'Content-Type': 'application/json'
    };

    http.post(
        'https://test-api.k6.io/user/register/', 
        JSON.stringify(credentials), 
        {
            headers
        }
    );

    const res = http.post(
        'https://test-api.k6.io/auth/token/login/', 
        JSON.stringify(credentials), 
        {
            headers
        }
    );
    console.log(res.json().access)

    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${res.json().access}` })
        }
    )
}