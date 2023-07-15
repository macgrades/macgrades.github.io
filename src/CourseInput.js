import React from 'react'
import { TextField, MenuItem, Button, Card, CardContent, Grid } from '@mui/material'

export default function CourseInput({ nameRef, gradeRef, unitsRef, addCourse}) {
  return (
    <Card sx={{minHeight: 250}} >
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
