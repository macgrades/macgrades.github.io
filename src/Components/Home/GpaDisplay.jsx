import { useContext } from "react";

import { CourseListContext } from "../../Contexts/CourseListContext";
import "./GpaDisplay.css";
import Card from "./Card";
import { calculateMacGPA, calculateStandardGPA } from "gpa-calculator/gpa";

export default function GpaDisplay() {
  const [courses] = useContext(CourseListContext);
  const standardGPA = calculateStandardGPA(courses);
  const macGPA = calculateMacGPA(courses);

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
    </>
  );
}
