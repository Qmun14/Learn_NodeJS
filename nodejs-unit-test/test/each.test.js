import { sumAll } from "../src/sum";

const table = [
  [
    [10, 10, 10],
    30
  ],
  [
    [10, 10, 10, 10, 10],
    50
  ],
  [
    [10, 10, 10, 10, 10, 10, 10],
    70
  ]
];

it.each(table)("test sumAll(%s) should result %i", (numbers, expected) => {
  expect(sumAll(numbers)).toBe(expected);
});