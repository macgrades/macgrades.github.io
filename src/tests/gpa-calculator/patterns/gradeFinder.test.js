import { findGrade } from "gpa-calculator/patterns/gradeFinder";

const VALID_GRADES = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];

it("returns null if no grade is found", () => {
  const text = "No grade";
  expect(findGrade(text)).toBeNull();
});

VALID_GRADES.forEach((grade) => {
  describe(`when the grade is ${grade}`, () => {
    it("returns the grade when it is at the end of the line", () => {
      const text = `MATH 1ZA3 Engineering Mathematics I 3.00/3.00 ${grade}`;
      expect(findGrade(text)).toBe(grade);
    });

    it("returns the grade when it is on its own", () => {
      const text = `${grade}`;
      expect(findGrade(text)).toBe(grade);
    });

    it("does not match when it is part of another word", () => {
      const text = `${grade}rade`;
      expect(findGrade(text)).toBeNull();
    });
  });
});
