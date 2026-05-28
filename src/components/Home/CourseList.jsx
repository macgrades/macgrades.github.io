import { useContext } from "react";
import { CourseListContext } from "../../contexts/CourseListContext";
import Card from "./Card";
import "./CourseList.css";
import { ReactComponent as TrashIcon } from "../../assets/trash-svgrepo-com.svg";
import { getTotals } from "gpa-calculator/gpa";

export default function CourseList() {
  const [courses, setCourses] = useContext(CourseListContext);
  const totals = getTotals(courses);

  const deleteCourse = (id) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id),
    );
  };

  const clearCourses = () => {
    setCourses([]);
  };

  return (
    <Card id="course-list">
      <div className="header">
        <h2>Transcript</h2>
        <button className="secondary" onClick={clearCourses}>
          Clear
        </button>
      </div>
      <ul className="courses">
        <div className="row">
          <p className="column">Course</p>
          <p className="column grade">Grade</p>
          <p className="column units">Units</p>
          <p className="delete-button">{/* Delete */}</p>
        </div>
        {courses.length === 0 && (
          <div className="empty-message">No courses added yet.</div>
        )}
        {courses.map((course) => (
          <div className="row" key={course.id}>
            <p className="column">
              <span className="truncate">{course.code}</span>
            </p>
            <p className="column grade">{course.grade}</p>
            <p className="column units">
              <span className="truncate">
                {parseFloat(course.units).toFixed(2)}
              </span>
            </p>
            <button
              className="delete-button"
              onClick={() => deleteCourse(course.id)}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        ))}
      </ul>
      <div className="footer">
        <div className="total">
          <h4>Courses</h4>
          <p>{totals.numberOfCourses}</p>
        </div>
        <div className="total">
          <h4>Total Units</h4>
          <p>{totals.units.toFixed(1)}</p>
        </div>
      </div>
    </Card>
  );
}
