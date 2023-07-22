import { sayHelloAsync } from "../src/async"

test('test Async function', async () => {
  const result = await sayHelloAsync("Ma'mun");
  expect(result).toBe("Hello Ma'mun");
});

test('test Async matchers', async () => {
  await expect(sayHelloAsync("Ma'mun")).resolves.toBe("Hello Ma'mun");
  await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});