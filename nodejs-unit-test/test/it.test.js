import { sumAll } from "../src/sum";

describe('When call sumAll([10,10,10])', () => {
  it('should get 30 with parameter [10,10,10]', () => {
    expect(sumAll([10, 10, 10])).toBe(30);
  });
  it.only('should get 50 with parameter [10,10,10,10,10]', () => {
    expect(sumAll([10, 10, 10, 10, 10])).toBe(50);
  });
})