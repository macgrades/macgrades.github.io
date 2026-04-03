import { useContext, useRef, useState } from "react";
import { CourseListContext } from "../../Contexts/CourseListContext";
import Card from "./Card";
import "./CourseInput.css";

export default function CourseInput() {
  const [courses, setCourses] = useContext(CourseListContext);
  const [error, setError] = useState("");
  const nameRef = useRef();
  const gradeRef = useRef();
  const unitsRef = useRef();

  const addCourse = (e) => {
    e.preventDefault();
    setError("");
    let name = nameRef.current.value;
    const grade = gradeRef.current.value;
    const units = unitsRef.current.value;
    if (grade && units && !isNaN(units) && Number(units) > 0) {
      if (!name) {
        name = `Course ${courses.length + 1}`;
      }
      const course = {
        code: name,
        units: units,
        grade: grade,
        id: crypto.randomUUID(),
      };
      setCourses((prevCourses) => [course, ...prevCourses]);
      nameRef.current.value = "";
    } else {
      setError("Please enter a valid grade and number of units.");
    }
  };

  return (
    <Card id="course-input-card">
      <h3>Add Course</h3>
      <form onSubmit={addCourse}>
        <div className="field">
          <label htmlFor="courseName" className="label">
            Course Name
          </label>
          <input ref={nameRef} type="text" id="courseName" />
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="grade" className="label">
              Grade
              <span aria-hidden="true">*</span>
            </label>
            <select ref={gradeRef} id="grade">
              <option value="A+">A+ / 12</option>
              <option value="A">A / 11</option>
              <option value="A-">A- / 10</option>
              <option value="B+">B+ / 9</option>
              <option value="B">B / 8</option>
              <option value="B-">B- / 7</option>
              <option value="C+">C+ / 6</option>
              <option value="C">C / 5</option>
              <option value="C-">C- / 4</option>
              <option value="D+">D+ / 3</option>
              <option value="D">D / 2</option>
              <option value="D-">D- / 1</option>
              <option value="F">F / 0</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="units">
              Units
              <span aria-hidden="true">*</span>
            </label>
            <input ref={unitsRef} defaultValue={3} type="text" id="units" />
          </div>
        </div>
        <div className="footer">
          <p className="error">{error ? error : "\u00a0"}</p>
          <button className="primary">Add Course</button>
        </div>
      </form>
    </Card>
  );
}
