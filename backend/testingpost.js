import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1000,
    duration: '10s'
}


export default function () {
  let url = 'http://localhost:8081/products';

  // You can customize the request payload based on your endpoint requirements
  let payload = {
    name: 'Product Name',
    description: 'Product Description',
    category: 'Product Category',
    brand: 'Product Brand',
    condition: 'New',
    style: 'Product Style',
    price: 100.0,
    status: 'Available',
    image: 'product_image.jpg',
  };

  let params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlkODQ2Y2RlNDkwZDA2OWE5NTA0NjQiLCJpYXQiOjE3MDUxNzIyMTUsImV4cCI6MTcwNTE3NTgxNX0.RIlVNxojXyaam_ZkpeYvFW9psZ7OLuVh4PPKMSqcAGw', 
    },
  };

  let res = http.post(url, JSON.stringify(payload), params);

  // Check if the request was successful
  check(res, {
    'Status is 200': (r) => r.status === 200,
  });

  // Sleep for a short duration between requests (adjust as needed)
  sleep(1);
}

/*
checks.........................: 43.95% ✓ 1424       ✗ 1816
data_received..................: 463 kB 24 kB/s
data_sent......................: 795 kB 42 kB/s
http_req_blocked...............: avg=7.26ms   min=0s    med=0s    max=90.89ms p(90)=2.04ms  p(95)=74.95ms
http_req_connecting............: avg=7.09ms   min=0s    med=0s    max=84.89ms p(90)=2ms     p(95)=74.39ms
http_req_duration..............: avg=3.33s    min=0s    med=0s    max=10.67s  p(90)=8.31s   p(95)=8.82s
  { expected_response:true }...: avg=7.59s    min=1.01s med=7.92s max=10.67s  p(90)=8.85s   p(95)=9.04s
http_req_failed................: 56.04% ✓ 1816       ✗ 1424
http_req_receiving.............: avg=50.05µs  min=0s    med=0s    max=1.19ms  p(90)=0s      p(95)=532.3µs
http_req_sending...............: avg=210.03µs min=0s    med=0s    max=26.52ms p(90)=455.2µs p(95)=1ms
http_req_tls_handshaking.......: avg=0s       min=0s    med=0s    max=0s      p(90)=0s      p(95)=0s
http_req_waiting...............: avg=3.33s    min=0s    med=0s    max=10.67s  p(90)=8.31s   p(95)=8.82s
http_reqs......................: 3240   170.838214/s
iteration_duration.............: avg=4.46s    min=1s    med=1.7s  max=11.68s  p(90)=9.31s   p(95)=9.82s
iterations.....................: 3240   170.838214/s
vus............................: 1      min=1        max=1000
vus_max........................: 1000   min=1000     max=1000


running (19.0s), 0000/1000 VUs, 3240 complete and 0 interrupted iterations
default ✓ [======================================] 1000 VUs  10s
*/