import http from "k6/http";

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ["p(95)<500"], // Trend
        'http_req_duration{status: 200}': ["p(95)<500"], // Trend
        'http_req_duration{status: 201}': ["p(95)<500"], // Trend
    }
}

export default function () {
    http.get("https://run.mocky.io/v3/b85e79b2-c13e-49bf-bc82-cabd17726a35");
    http.get("https://run.mocky.io/v3/39314cfe-229e-4e01-95a1-bbfd50ac16cd?mocky-delay=1000ms");
}