import React, { useState, useEffect, useContext } from "react";

import { CourseListContext } from "../../Contexts/CourseListContext";
import "./GpaDisplay.css";
import Card from "./Card";

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

export default function GpaDisplay() {
  const [courses] = useContext(CourseListContext);
  const [standardGPA, setStandardGPA] = useState(0.0);
  const [macGPA, setMacGPA] = useState(0.0);

  function calculateGPA(gradeConversion) {
    let pointsAttm = 0.0;
    let pointsEarned = 0.0;

    courses.forEach((course) => {
      let grade = parseFloat(gradeConversion[course.grade]);
      let units = parseFloat(course.units);
      pointsEarned += units * grade;
      pointsAttm += units;
    });
    return pointsEarned / pointsAttm;
  }

  useEffect(() => {
    setStandardGPA(calculateGPA(standardGrades));
    setMacGPA(calculateGPA(macGrades));
    if (courses.length === 0) {
      setStandardGPA(0.0);
      setMacGPA(0.0);
    }
  }, [courses]);

  return (
    <>
      <Card>
        <div className="gpa-title">4.0 Scale GPA</div>

        <div className="gpa gpa-num">{standardGPA.toFixed(2)}</div>
      </Card>
      <Card>
        <div className="gpa-title">McMaster GPA</div>

        <div className="gpa gpa-num">{macGPA.toFixed(1)}</div>
      </Card>
      {/* <InlineCard> */}
      {/*   <InlineCardContent> */}
      {/*     <div className="gpa">4.0 Scale GPA</div> */}
      {/**/}
      {/*     <div className="gpa gpa-num">{standardGPA.toFixed(2)}</div> */}
      {/*   </InlineCardContent> */}
      {/*   <InlineCardContent> */}
      {/*     <div className="gpa">McMaster GPA</div> */}
      {/**/}
      {/*     <div className="gpa gpa-num">{macGPA.toFixed(1)}</div> */}
      {/*   </InlineCardContent> */}
      {/*   <span /> */}
      {/* </InlineCard> */}
    </>
  );
}
