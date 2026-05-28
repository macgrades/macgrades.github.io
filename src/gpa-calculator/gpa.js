export function calculateStandardGPA(courses) {
  return calculateGPA(courses, standardGrades);
}

export function calculateMacGPA(courses) {
  return calculateGPA(courses, macGrades);
}

export function getTotals(courses) {
  const { pointsAttm } = calculatePoints(courses, macGrades);

  return { numberOfCourses: courses.length, units: pointsAttm };
}

function calculateGPA(courses, gradeConversion) {
  if (courses.length === 0) return 0.0;

  const { pointsAttm, pointsEarned } = calculatePoints(
    courses,
    gradeConversion,
  );

  if (pointsAttm === 0) {
    return 0.0;
  }
  return pointsEarned / pointsAttm;
}

function calculatePoints(courses, gradeConversion) {
  let pointsAttm = 0.0;
  let pointsEarned = 0.0;

  courses.forEach((course) => {
    let grade = parseFloat(gradeConversion[course.grade]);
    let units = parseFloat(course.units);
    pointsEarned += units * grade;
    pointsAttm += units;
  });
  return { pointsAttm, pointsEarned };
}

const macGrades = {
  "A+": 12,
  A: 11,
  "A-": 10,
  "B+": 9,
  B: 8,
  "B-": 7,
  "C+": 6,
  C: 5,
  "C-": 4,
  "D+": 3,
  D: 2,
  "D-": 1,
  F: 0,
};

const standardGrades = {
  "A+": 4,
  A: 3.9,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  "D+": 1.3,
  D: 1,
  "D-": 0.7,
  F: 0,
};
