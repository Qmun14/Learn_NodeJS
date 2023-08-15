import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser("CONTOHSECRETRAHASIA"));
app.use(express.json());

/**
 * ? Baca Cookie /Read
 */
app.get('/', (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

/**
 * ? Tulis Cookie /write
 */
app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: '/', signed: true });
  res.send(`Hello ${name}`);
})

test('Test Cookie Read', async () => {
  const response = await request(app).get('/')
    .set("Cookie", "Login=s%3AMamun.lEER1Dyp3JSEYhYjIoMu9Rlhal3cwd6jCII9vBxstoY; Path=/");
  expect(response.text).toBe('Hello Mamun');
});

test('Test Cookie Write', async () => {
  const response = await request(app).post('/login')
    .send({ name: 'Mamun' });
  console.log(response.get("Set-Cookie"));
  expect(response.get('Set-Cookie').toString()).toContain('Mamun');
  expect(response.text).toBe('Hello Mamun');
});