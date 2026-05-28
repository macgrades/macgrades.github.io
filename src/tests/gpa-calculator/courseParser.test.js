import { getCourses } from "gpa-calculator/courseParser";

it("parses a course code, grade, and units", () => {
  const transcriptLines = ["MATH 1ZA3 Engineering Mathematics I 3.00/3.00 A+"];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "MATH 1ZA3",
      grade: "A+",
      units: 3,
    },
  ]);
});

it("parses a course with the course info split across multiple lines", () => {
  const transcriptLines = [
    "MATH 1ZA3 Engineering Mathematics I",
    "Term Enrolment",
    "Attm./Earned Units",
    "3.00/3.00 A+",
  ];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "MATH 1ZA3",
      grade: "A+",
      units: 3,
    },
  ]);
});

it("skips incomplete courses", () => {
  const transcriptLines = [
    "MATH 1ZA3 Engineering Mathematics I",
    "Term Enrolment",
    "Attm./Earned Units",
    "3.00/0.00", // missing grade
    "ENGINEER 1P13B Integrated Dsgn Projcts in Eng 13.00/0.00", // missing grade
    "PHYSICS 1D03 Mechanics 3.00/3.00 A",
  ];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "PHYSICS 1D03",
      grade: "A",
      units: 3,
    },
  ]);
});

it("skips non-graded courses", () => {
  const transcriptLines = [
    "WHMIS 1A00 Intro To Health And Safety 0.00/0.00 COM", // not graded
    "MATH 1ZA3 Engineering Mathematics I 3.00/3.00 A+",
  ];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "MATH 1ZA3",
      grade: "A+",
      units: 3,
    },
  ]);
});

it("parses failed courses", () => {
  const transcriptLines = ["MATH 1ZA3 Engineering Mathematics I 3.00/0.00 F"];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "MATH 1ZA3",
      grade: "F",
      units: 3,
    },
  ]);
});

it("parses courses with unrecognized course codes", () => {
  const transcriptLines = [
    "SOMECOURSE",
    "Term Enrolment",
    "Attm./Earned Units",
    "3.00/3.00",
    "Grade",
    "A+",
  ];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "Unrecognized Course",
      grade: "A+",
      units: 3,
    },
  ]);
});

it("parses multi-term courses", () => {
  const transcriptLines = [
    "ENGINEER 1P13A Integrated Dsgn Projcts in Eng 0.00/0.00 MT",
    "ENGINEER 1P13B Integrated Dsgn Projcts in Eng 13.00/13.00 A+",
  ];

  const courses = getCourses(transcriptLines);

  expect(courses).toEqual([
    {
      code: "ENGINEER 1P13B",
      grade: "A+",
      units: 13,
    },
  ]);
});
