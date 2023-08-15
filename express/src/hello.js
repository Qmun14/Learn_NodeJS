import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.get('/mamun', (req, res) => {
  res.send("Hello mamun!");
});

app.listen(3000, () => {
  console.log(`server run on port 3000`);
});