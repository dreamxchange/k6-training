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

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/', 
        JSON.stringify(credentials), 
        {
            headers
        }
    );

    const accessToken = res.json().access;

    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify({
            name: 'Crocodile1',
            sex: 'M',
            date_of_birth: '2000-01-01',
        }),
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    );

    const newCrocodileId = res.json().id;

    check(res, {
        'status is 201': (r) => r.status === 201,
        'Content-Type is application/json': (r) => r.headers['Content-Type'] === 'application/json'
    });


    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    )

    res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    )

    check(res, {
        'Crocodile id is correct': (r) => r.json().id === newCrocodileId,
    });

    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify({
            name: 'Updated Crocodile1',
            sex: 'M',
            date_of_birth: '2000-01-01',
        }),
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    );

    check(res, {
        'Crocodile name is correct': (r) => r.json().name === 'Updated Crocodile1',
    });

    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify({
            sex: 'F',
        }),
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    );

    check(res, {
        'Crocodile sex is correct': (r) => r.json().sex === 'F',
    });

    res = http.del(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
    );

    check(res, {
        'status is 204': (r) => r.status === 204,
    });
}