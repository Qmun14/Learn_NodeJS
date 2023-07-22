test('string', () => {
  const name = 'Ma\'mun Ramdhan';

  expect(name).toBe('Ma\'mun Ramdhan');
  expect(name).toMatch(/mdh/);
})