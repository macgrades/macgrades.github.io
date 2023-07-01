import React from 'react'
import { TextField, MenuItem } from '@mui/material'

export default function CourseInput({ nameRef, gradeRef, unitsRef, addCourse}) {
  return (
    <div>
        <TextField inputRef={nameRef} label="Course Name" variant="standard" type="text" id="courseName" />
        <TextField inputRef={gradeRef} label="Grade" variant="standard" type="text" id="grade-select" select defaultValue="A+">
          <MenuItem value="A+">A+/12</MenuItem>
          <MenuItem value="A">A/11</MenuItem>
          <MenuItem value="A-">A-/10</MenuItem>
          <MenuItem value="B+">B+/9</MenuItem>
          <MenuItem value="B">B/8</MenuItem>
          <MenuItem value="B-">B-/7</MenuItem>
          <MenuItem value="C+">C+/6</MenuItem>
          <MenuItem value="C">C/5</MenuItem>
          <MenuItem value="C-">C-/4</MenuItem>
          <MenuItem value="D+">D+/3</MenuItem>
          <MenuItem value="D">D/2</MenuItem>
          <MenuItem value="D-">D-/1</MenuItem>
          <MenuItem value="F">F/0</MenuItem>
        </TextField>
        <TextField inputRef={unitsRef} label="Units" variant="standard" type="text" id="units"/>
        <button id="addCourseBtn" onClick={addCourse}>Add Course</button>
        </div>
  )
}
