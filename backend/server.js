const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello từ AKS, đang test Trivy!');
});

app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`);
});

// Ép Action chạy lần cuối để test trivy
// Thêm comment để test sonarcloud lần nữa
// Thêm comment để test sonarcloud voi fix project key
// Thêm comment để test harbor - fix syntax name cua harbor username