import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { v4 as uuidv4 } from 'uuid';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.1']
  },
  vus: 10,
  duration: '10s',
};

const SLEEP_DURATION = 0.1;
const API_URL = 'http://localhost:3000'

function getRandomNumber(max){
  const min = 1
  return Math.floor(Math.random() * (max - min) + min)
}
export default function () {
  group("Post an action", function () {
    let body = JSON.stringify({
      id: uuidv4(),
      action: `action-${getRandomNumber(10)}`
    });

    let params = {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: {
        name: 'post',
      },
    };

    let response = http.post(`${API_URL}/actions`, body, params);
    check(response, {
      'is status 200': (r) => r.status === 200
    });

    sleep(SLEEP_DURATION);
  });
}
