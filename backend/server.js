const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello từ AKS, đang test Trivy!');
});

app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`);
});

// Ép Action chạy lần cuối để test Trivy