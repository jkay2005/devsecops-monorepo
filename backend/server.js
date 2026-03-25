const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hoàn thành CI/CD pipeline trên GitHub Actions!');
});

app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`);
});

// Test kich hoat CI/CD tren GitHub Actions