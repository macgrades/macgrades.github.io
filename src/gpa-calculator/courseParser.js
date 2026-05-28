import { findCourseCode } from "gpa-calculator/patterns/codeFinder";
import { findGrade } from "gpa-calculator/patterns/gradeFinder";
import { findUnits } from "gpa-calculator/patterns/unitFinder";

export const getCourses = (transcriptLines) => {
  const courses = [];

  let course = newCourse();

  for (const line of transcriptLines) {
    updateCourseCode(course, line);
    updateUnits(course, line);
    updateGrade(course, line);
    if (isCourseComplete(course)) {
      courses.push(course);
      course = newCourse();
    }
  }

  return courses;
};

const newCourse = () => {
  return {
    code: "Unrecognized Course",
    grade: null,
    units: null,
  };
};

const isCourseComplete = (course) => {
  return course.grade !== null && course.units !== null;
};

const updateUnits = (course, line) => {
  const foundUnits = findUnits(line);
  if (foundUnits !== null) {
    course.units = foundUnits;
    // reset grade since we found a new course. grades always come after units, so if we find new units, we know we're on a new course
    // we need to do this because due to the transcript pdf format, course info can be split across multiple lines.
    course.grade = null;
  }
};

const updateGrade = (course, line) => {
  const foundGrade = findGrade(line);
  if (foundGrade !== null) {
    course.grade = foundGrade;
  }
};

const updateCourseCode = (course, line) => {
  const foundCourseCode = findCourseCode(line);
  if (foundCourseCode !== null) {
    course.code = foundCourseCode;
  }
};
