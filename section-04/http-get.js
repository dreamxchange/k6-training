import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // const res = http.get('https://test-api.k6.io/public/crocodiles/');
    // console.log(res);
    // http.get('https://test-api.k6.io/public/crocodiles/');

    // const res = http.get('https://test-api.k6.io/public/crocodiles/7/');

    // check(res, {
    //     'status is 200': (r) => r.status === 200,
    //     // 'Crocodile is Sobek': (r) => r.body.includes('Sobek')
    //     'Crocodile is Sobek': (r) => r.json().name === 'Sobek'
    // });

    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    const crocodiles = res.json();
    const firstCrocodile = crocodiles[0];
    
    res = http.get(`https://test-api.k6.io/public/crocodiles/${firstCrocodile.id}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name is correct': (r) => r.json().name === firstCrocodile.name,
        'Content-Type is application/json': (r) => r.headers['Content-Type'] === 'application/json'
    });
}

// k6 run ./section-04/http-get.js
// k6 run --http-debug ./section-04/http-get.js
// k6 run --http-debug='full' ./section-04/http-get.js