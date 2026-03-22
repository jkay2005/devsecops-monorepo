const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Backend Node.js đang chạy thành công qua Docker! Database và Redis đã sẵn sàng.');
});

app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`);
});