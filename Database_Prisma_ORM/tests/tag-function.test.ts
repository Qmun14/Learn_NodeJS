import { test } from '@jest/globals';

function tagFunction(array: TemplateStringsArray, ...args: any[]) {
  console.log(array);
  console.log(args);
}

test('tag function', () => {
  const name = 'Mamun';
  const lastname = "Ramdhan";

  tagFunction`Hello ${name} ${lastname}!, How are you?`;
  tagFunction`Bye ${name} ${lastname}!, see you later`;
})

test('tag function sql', () => {
  const name = 'Mamun';
  const age = 32;

  tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`;
})