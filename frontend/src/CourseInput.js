import React from 'react'

export default function CourseInput({ nameRef, gradeRef, unitsRef, addCourse}) {
  return (
    <div>
        <label htmlFor="courseName">Course Name</label><input ref={nameRef} type="text" id="courseName"/>
        <label htmlFor="grade">Grade</label>
        <select ref={gradeRef} id="grade">
            <option value="A+">A+/12</option>
            <option value="A">A/11</option>
            <option value="A-">A-/10</option>
            <option value="B+">B+/9</option>
            <option value="B">B/8</option>
            <option value="B-">B-/7</option>
            <option value="C+">C+/6</option>
            <option value="C">C/5</option>
            <option value="C-">C-/4</option>
            <option value="D+">D+/3</option>
            <option value="D">D/2</option>
            <option value="D-">D-/1</option>
            <option value="F">F/0</option>
        </select>
        <label htmlFor="units">Units</label><input ref={unitsRef} type="text" id="units"/>
        <button id="addCourseBtn" onClick={addCourse}>Add Course</button>
        </div>
  )
}
