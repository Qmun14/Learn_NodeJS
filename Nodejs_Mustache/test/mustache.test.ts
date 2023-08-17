import { test, expect } from '@jest/globals'
import Mustache from 'mustache';
import fs from 'fs/promises';

test('Menggunakan Mustache', () => {
  const data = Mustache.render("Hello {{name}}", { name: "Mamun" });
  // Hello Mamun
  expect(data).toBe('Hello Mamun');
});

test('Menggunakan Mustache Cache', () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{name}}", { name: "Mamun" });
  // Hello Mamun
  expect(data).toBe('Hello Mamun');
});

test('Tags', () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
    name: "Mamun",
    hobby: "<b>Programming</b>"
  });
  // Hello Mamun
  expect(data).toBe('Hello Mamun, my hobby is <b>Programming</b>');
});

test('Nested Object', () => {
  const data = Mustache.render("Hello {{person.name}}", {
    person: {
      name: "Mamun"
    }
  });
  // Hello Mamun
  expect(data).toBe('Hello Mamun');
});

test('Mustache File', async () => {
  const helloTemplate = await fs.readFile('./templates/hello.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: 'Qmun14 Labs'
  });
  console.log(data);
  expect(data).toContain('Qmun14 Labs');
});

test('Sections Not Show', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.log(data);
  expect(data).not.toContain('Hello Person');
});

test('Sections Show', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: 'Mamun'
    }
  });

  console.log(data);
  expect(data).toContain('Hello Person');
});

test('Sections Data', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: 'Mamun'
    }
  });

  console.log(data);
  expect(data).toContain('Hello Person Mamun!');
});

test('Inverted Sections', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.log(data);
  expect(data).toContain('Hello Guest');
});

test('List', async () => {
  const helloTemplate = await fs.readFile('./templates/hobbies.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    hobbies: ["Coding", "Gamming", "Reading"]
  });

  console.log(data);
  expect(data).toContain('Coding');
  expect(data).toContain('Gamming');
  expect(data).toContain('Reading');
});

test('List Object', async () => {
  const helloTemplate = await fs.readFile('./templates/students.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      { name: "Mamun", value: 100 },
      { name: "Budi", value: 90 }
    ]
  });

  console.log(data);
  expect(data).toContain('Mamun');
  expect(data).toContain('100');
  expect(data).toContain('Budi');
  expect(data).toContain('90');
});

test('Functions', async () => {
  const parameter = {
    name: 'Mamun',
    upper: () => {
      return (text: any, render: any) => {
        return render(text).toUpperCase();
      }
    }
  }

  const data = Mustache.render("hello {{#upper}}{{name}}{{/upper}}", parameter);
  console.log(data);
  expect(data).toBe('hello MAMUN');
});

test('Comment', async () => {
  const helloTemplate = await fs.readFile('./templates/comment.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: "Mamun"
  });

  console.log(data);
  expect(data).toContain('Mamun');
  expect(data).not.toContain('Ini Komentar');
});

test('Partials', async () => {
  const headerTemplate = await fs.readFile('./templates/partials/header.mustache').then(data => data.toString());
  const contentTemplate = await fs.readFile('./templates/partials/content.mustache').then(data => data.toString());
  const footerTemplate = await fs.readFile('./templates/partials/footer.mustache').then(data => data.toString());

  const data = Mustache.render(contentTemplate, {
    title: "Mamun",
    content: "Belajar Mustache JS"
  }, {
    header: headerTemplate,
    footer: footerTemplate
  });

  console.log(data);
  expect(data).toContain("Mamun");
  expect(data).toContain('Belajar Mustache JS');
  expect(data).toContain('Powered by Qmun14 Labs');
});

