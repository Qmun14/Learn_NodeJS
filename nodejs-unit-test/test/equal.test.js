test('test toBe', () => {
  const name = 'Ma\'mun';
  const hello = `Hello ${name}`;

  expect(hello).toBe('Hello Ma\'mun');
})

// Todo: Cek object gunakan toEqual
test('test toEqual', () => {
  let person = { id: "ma'mun" };
  Object.assign(person, { name: "Ma'mun" });

  expect(person).toEqual({ id: "ma'mun", name: "Ma'mun" });
});