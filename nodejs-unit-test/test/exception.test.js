import { MyException, callMe } from "../src/exception"

test('exception', () => {
  expect(() => callMe('Ma\'mun')).toThrow();
  expect(() => callMe('Ma\'mun')).toThrow(MyException);
  expect(() => callMe('Ma\'mun')).toThrow("Ups my exceptions happens");
});

test('exception not happens', () => {
  expect(callMe("Budi")).toBe("OK");
});
