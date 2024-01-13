import http from 'k6/http';

export const options = {
    vus: 1000,
    duration: '10s'
}

export default () => {
    http.post('http://127.0.0.1:8081/products/')
}

/*
data_received..................: 6.3 MB 337 kB/s
data_sent......................: 175 kB 9.3 kB/s
http_req_blocked...............: avg=1.1ms    min=0s       med=0s    max=49.57ms p(90)=2ms     p(95)=5ms
http_req_connecting............: avg=875.92µs min=0s       med=0s    max=49.57ms p(90)=1.99ms  p(95)=3.82ms
http_req_duration..............: avg=3.94s    min=0s       med=2.64s max=10.97s  p(90)=9.04s   p(95)=9.64s
  { expected_response:true }...: avg=7.11s    min=200.57ms med=8.79s max=10.97s  p(90)=9.58s   p(95)=9.86s
http_req_failed................: 44.53% ✓ 1581       ✗ 1969
http_req_receiving.............: avg=87.06µs  min=0s       med=0s    max=2.01ms  p(90)=407.2µs p(95)=798.75µs
http_req_sending...............: avg=388.06µs min=0s       med=0s    max=32.57ms p(90)=0s      p(95)=999.61µs
http_req_tls_handshaking.......: avg=0s       min=0s       med=0s    max=0s      p(90)=0s      p(95)=0s
http_req_waiting...............: avg=3.94s    min=0s       med=2.64s max=10.97s  p(90)=9.04s   p(95)=9.64s
http_reqs......................: 3550   189.357876/s
iteration_duration.............: avg=4.09s    min=1.99ms   med=2.65s max=10.97s  p(90)=9.04s   p(95)=9.64s
iterations.....................: 3550   189.357876/s
vus............................: 98     min=98       max=1000
vus_max........................: 1000   min=1000     max=1000


running (18.7s), 0000/1000 VUs, 3550 complete and 0 interrupted iterations
default ✓ [======================================] 1000 VUs  10s
*/