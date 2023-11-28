import { validateInput } from "../utils/utils";

describe("test validateInput", () => {
  test("empty string should return false", () => {
    expect(validateInput("", "12")).toBeFalsy();
  });
  test("when the new value is bigger than 10% of the previous function returns false", () => {
    expect(validateInput("100", "12")).toBeFalsy();
  });
  test("when the new value is less than 10% of the previous function returns false", () => {
    expect(validateInput("1", "12")).toBeFalsy();
  });
  test("when the new value is not bigger and not less than 10% of the previous value returns true", () => {
    expect(validateInput("95", "100")).toBeTruthy();
  });
});
