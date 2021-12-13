const express = require('express');
const redis = require('redis');
// redis 클라이언트 생성
const client = redis.createClient({
  host: 'redis-server',
  port: 6379, // redis 기본포트
});

const app = express();

// 숫자는 0부터 시작합니다.
client.set('number', 0);
app.get('/', (req, res) => {
  client.get('number', (err, number) => {
    // 현재 숫자를 가져온 후에 1씩 올려줌
    client.set('number', parseInt(number) + 1);
    res.send('숫자가 1씩 증가. 숫자: ' + number);
  });
});

app.listen(8080, () => {
  console.log('server is listening on 8080');
});
