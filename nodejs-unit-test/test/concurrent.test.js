import { sayHelloAsync } from "../src/async"

test.concurrent('concurrent 1', async () => {
  await expect(sayHelloAsync("Ma'mun")).resolves.toBe("Hello Ma'mun");
});
test.concurrent('concurrent 2', async () => {
  await expect(sayHelloAsync("Ma'mun")).resolves.toBe("Hello Ma'mun");
});
test.concurrent('concurrent 3', async () => {
  await expect(sayHelloAsync("Ma'mun")).resolves.toBe("Hello Ma'mun");
});

