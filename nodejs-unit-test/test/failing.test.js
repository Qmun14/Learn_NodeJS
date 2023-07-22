import { sayHello } from "../src/sayHello";

it("sayHello success", () => {
  expect(sayHello("Ma'mun")).toBe("Hello Ma'mun");
});

it.failing("sayHello error", () => {
  sayHello(null)
});

it("sayHello error matchers", () => {
  expect(() => sayHello(null)).toThrow();
});