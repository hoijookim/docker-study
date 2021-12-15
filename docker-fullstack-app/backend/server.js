const express = require('express');

const db = require('./db');

const app = express();

// json 형태 본문 해석할수 있게 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 테이블 생성
db.pool.query(
  'CREATE TABLE lists (id INTEGER AUTO INCREMENT, value TEXT, PRIMARY KEY (id))',
  (err, results, fields) => {
    console.log('results', results);
  }
);

// DB lists 테이블에 있는 모든 데이터를 프론트에 전달
app.get('/api/values', (req, res, next) => {
  // DB에서 모든정보 호출
  db.pool.query('SELECT * FROM lists;', (err, results, field) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 입력
app.post('/api/value', (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
