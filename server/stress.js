import http from 'k6/http';
import { sleep } from 'k6';


// Request Rate = (VU * R) / T

// Request Rate: measured by the number of requests per second(RPS)
// VU: the number of virtual users
// R: the number of requests per VU iteration
// T: a value larger than the time needed to complete a VU iteration



export let options = {
  vus: 600,
  duration: '30s'
};

export default function () {
  const before = new Date().getTime();
  const T = 6; // time needed to complete a VU iteration

  // Replace this with normal requests w/o a for-loop
  for (let i = 0; i < 10; i++) {
    let id = Math.floor(Math.random() * 10000000) + 1;
    http.get(`http://localhost:3004/${id}`);
  }

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }
}