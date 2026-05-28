import { findUnits } from "gpa-calculator/patterns/unitFinder";

test("returns attempted units on completed courses", () => {
  const text = "3.00/3.00";
  expect(findUnits(text)).toBe(3);
});

test("returns attempted units on incomplete courses", () => {
  const text = "3.00/0.00";
  expect(findUnits(text)).toBe(3);
});

test("returns null if no match is found", () => {
  const text = "No units";
  expect(findUnits(text)).toBeNull();
});

test("returns attempted units when only attempted units are present", () => {
  const text = "3.00";
  expect(findUnits(text)).toBe(3);
});

test("does not match on GPA values", () => {
  const text = "9.0";
  expect(findUnits(text)).toBeNull();
});

test("does not match on non-zero attempted decimal values", () => {
  const text = "3.50/3.50";
  expect(findUnits(text)).toBeNull();
});

test("does match on trailing zeros earned units", () => {
  const text = "3.50/0.00";
  expect(findUnits(text)).toBe(0);
});
