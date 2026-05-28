import { findUnits } from "gpa-calculator/patterns/unitFinder";

it("returns attempted units on completed courses", () => {
  const text = "3.00/3.00";
  expect(findUnits(text)).toBe(3);
});

it("returns attempted units on 10+ unit courses", () => {
  const text = "13.00/13.00";
  expect(findUnits(text)).toBe(13);
});

it("extracts units from a course line", () => {
  const text = "MATH 1ZA3 Engineering Mathematics I 3.00/3.00 A+";
  expect(findUnits(text)).toBe(3);
});

it("returns attempted units on incomplete courses", () => {
  const text = "3.00/0.00";
  expect(findUnits(text)).toBe(3);
});

it("returns null if no match is found", () => {
  const text = "No units";
  expect(findUnits(text)).toBeNull();
});

it("returns attempted units when only attempted units are present", () => {
  const text = "3.00";
  expect(findUnits(text)).toBe(3);
});

it("does not match on GPA values", () => {
  const text = "9.0";
  expect(findUnits(text)).toBeNull();
});

it("does not match on non-zero attempted decimal values", () => {
  const text = "3.50/3.50";
  expect(findUnits(text)).toBeNull();
});

it("does match on trailing zeros earned units", () => {
  const text = "3.50/0.00";
  expect(findUnits(text)).toBe(0);
});
