const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
