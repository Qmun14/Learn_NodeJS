import express, { text } from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload'

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  /**
   * Opsi ini memungkinkan untuk memilih antara penguraian data yang di-encode URL dengan library querystring (bila salah) atau library qs (bila benar). Sintaks "extended" memungkinkan objek dan array yang kompleks dikodekan ke dalam format yang dienkode URL, sehingga memberikan pengalaman seperti JSON dengan enkode URL. Defaultnya : true
   */
  extended: false
}));
app.use(expressFileUpload());

app.post('/json', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

app.post('/form', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

app.post('/file', async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + '/upload/' + textFile.name);

  res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

test('Test Request File Upload', async () => {
  const response = await request(app)
    .post('/file')
    .set("Content-Type", 'multipart/form-data')
    .field('name', "Mamun")
    .attach('article', __dirname + '/contoh.txt');

  expect(response.text).toBe('Hello Mamun, you uploaded contoh.txt');
});

test('Test Request JSON', async () => {
  const response = await request(app)
    .post('/json')
    .set("Content-Type", "application/json")
    .send({ name: 'World' });
  expect(response.body).toEqual({
    hello: `Hello World`
  });
});

test('Test Request Form', async () => {
  const response = await request(app)
    .post('/form')
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send('name=World');
  expect(response.body).toEqual({
    hello: `Hello World`
  });
});