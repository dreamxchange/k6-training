import { check, sleep } from "k6";
import exec from 'k6/execution'
import http from "k6/http";
import { Counter, Trend } from 'k6/metrics'

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        // checks: ["rate>0.98"], // Rate
        http_req_duration: ["p(95)<500"], // Trend
        // http_req_duration: ["max<1500"], // Trend
        // http_req_failed: ["rate<0.01"], // Rate
        // http_reqs: ["count>100"], // Counter
        // http_reqs: ["rate>20"], // Counter
        my_counter: ["count>10"], // Counter
        response_time_news_page: ["p(95)<500", "p(99)<700"], // Counter
        // vus: ["value>5"], // Gauge
    }
}

let myCounter = new Counter('my_counter')
let newsPageResponseTrend = new Trend('response_time_news_page')


export default function () {
    let res = http.get("http://test.k6.io/" + (exec.scenario.iterationInTest === 1 ? 'contact.php' : ''));
    myCounter.add(1)
    // check(res, {
    //     "status is 200": (r) => r.status === 200,
    //     "page is start page": (r) => r.body.includes("Collection of simple web-pages suitable for load testing"),
    // })
    sleep(1);

    res = http.get("http://test.k6.io/news.php");
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);
}