import { returnFive } from "./shouldBeFive";

describe('counter', () => {
  it('should test', () => {
    expect(1).toBe(1);
  });
  it('should return five!', () => {
    expect(returnFive()).toBe(5);
  });
});
