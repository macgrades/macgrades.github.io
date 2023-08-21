import React, { useContext, useRef } from 'react'
import { TextField, MenuItem, Button, Card, CardContent, Grid } from '@mui/material'
import { CourseListContext } from '../../Contexts/CourseListContext'

export default function CourseInput() {

  const [courses, setCourses] = useContext(CourseListContext);
  const nameRef = useRef();
  const gradeRef = useRef();
  const unitsRef = useRef();


  const addCourse = () => {
    let name = nameRef.current.value;
    const grade = gradeRef.current.value;
    const units = unitsRef.current.value;
    if (grade && units && !isNaN(units)) {
      if (!name) {
        name = `Course ${courses.length+1}`;
      }
      const course = {
        code: name,
        units: units,
        grade: grade,
        id: crypto.randomUUID()
      };
      setCourses(prevCourses => [course, ...prevCourses]);
      nameRef.current.value = '';
    }
  }

  return (
    <Card sx={{minHeight: '100%', width: '50%' }} >
      <CardContent  sx={{ display: 'flex', justifyContent: 'center' }} >
        <Grid item container spacing={3} justifyContent='center' alignItems='center' >
          <Grid item xs={12} md={12} >
            <TextField inputRef={nameRef} label="Course Name" variant="standard" type="text" id="courseName" fullWidth />
          </Grid>
          <Grid item xs={12} md={12} >
            <TextField required inputRef={unitsRef} label="Units" variant="standard" type="text" id="units" fullWidth />
          </Grid>
          <Grid item xs={6} md={6} >
            <TextField required inputRef={gradeRef} label="Grade" variant="standard" type="text" id="grade-select" select defaultValue="A+" fullWidth>
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
          </Grid>
          <Grid item xs={6} md={6} >
            <Button variant='contained' id="addCourseBtn" onClick={addCourse}>Add Course</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      
  )
}
