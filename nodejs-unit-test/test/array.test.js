test('array', () => {
  const names = ['Ma\'mun', 'Ramdhan', 'vanderwerff'];
  expect(names).toContain('Ramdhan');
  expect(names).toEqual(['Ma\'mun', 'Ramdhan', 'vanderwerff']);
});

test('array object', () => {
  const persons = [
    {
      name: 'Ma\'mun'
    },
    {
      name: 'Budi'
    }
  ];

  expect(persons).toContainEqual({
    name: 'Ma\'mun'
  });
});