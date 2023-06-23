import React, { useState, useEffect, useRef } from 'react';
import CourseList from './CourseList';
import FileUpload from './FileUpload';
import CourseInput from './CourseInput';
import GpaDisplay from './GpaDisplay';

import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  
  const [courses, setCourses] = useState([]);
  const fileRef = useRef();
  const nameRef = useRef();
  const gradeRef = useRef();
  const unitsRef = useRef();
  

  function handleFileUpload(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', file);
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(course => {
        course.id = crypto.randomUUID();
      });
      setCourses(prevCourses => [...prevCourses, ...data]);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    fileRef.current.value = null;
  }

  function addCourse() {
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
        built: true,
        id: crypto.randomUUID()
      };
      setCourses(prevCourses => [course, ...prevCourses]);
      nameRef.current.value = '';
    }
  }

  function deleteCourse(courseID) {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseID));
  }

  function clearCourses() {
    setCourses([]);
  }

  return (
    <>
      <main>
        <FileUpload fileRef={fileRef} handleFileUpload={handleFileUpload} />
        <CourseInput nameRef={nameRef} gradeRef={gradeRef} unitsRef={unitsRef} addCourse={addCourse} />
        <Box  >
        <Grid container spacing={2} justifyContent='space-evenly'> 
          <Grid item >
            <CourseList courses={courses} deleteCourse={deleteCourse} clearCourses={clearCourses} />
          </Grid>
          <Grid item >
            <GpaDisplay courses={courses} />
          </Grid>
        </Grid>
      </Box>
      </main>
    </>
  );
}

export default App;
