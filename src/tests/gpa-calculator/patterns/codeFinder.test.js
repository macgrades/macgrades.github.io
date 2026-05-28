import { findCourseCode } from "gpa-calculator/patterns/codeFinder";
import { readFileSync } from "fs";

const UNDERGRAD_COURSES = readFileSync(
  "src/tests/gpa-calculator/patterns/samples/undergradCourses.txt",
  "utf-8",
)
  .split("\n")
  .filter((line) => line.trim() !== "");

const GRAD_COURSES = readFileSync(
  "src/tests/gpa-calculator/patterns/samples/gradCourses.txt",
  "utf-8",
)
  .split("\n")
  .filter((line) => line.trim() !== "");

it("returns the course code from a course line", () => {
  const text = "MATH 1ZA3 Engineering Mathematics I 3.00/3.00 A+";

  expect(findCourseCode(text)).toBe("MATH 1ZA3");
});

it("returns the course codes for multi-term courses", () => {
  const firstTerm =
    "ENGINEER 1P13A Integrated Dsgn Projcts in Eng 0.00/0.00 MT";
  const secondTerm =
    "ENGINEER 1P13B Integrated Dsgn Projcts in Eng 13.00/13.00 A+";

  expect(findCourseCode(firstTerm)).toBe("ENGINEER 1P13A");
  expect(findCourseCode(secondTerm)).toBe("ENGINEER 1P13B");
});

it("returns null if no course code is found", () => {
  const text = "NOTACOURSE Engineering Art I 3.00/3.00 A+";

  expect(findCourseCode(text)).toBeNull();
});

it("returns null if the course code is malformed", () => {
  const text = "MATH1ZA3 Engineering Mathematics I 3.00/3.00 A+";

  expect(findCourseCode(text)).toBeNull();
});

describe("grad courses", () => {
  GRAD_COURSES.forEach((course) => {
    it(`finds the course code in "${course}"`, () => {
      expect(findCourseCode(course)).toEqual(course);
    });
  });
});

describe("undergrad courses", () => {
  UNDERGRAD_COURSES.forEach((course) => {
    it(`finds the course code in "${course}"`, () => {
      expect(findCourseCode(course)).toEqual(course);
    });
  });
});
