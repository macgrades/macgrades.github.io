import React, { useState, useRef } from 'react';
import CourseList from './CourseList';
import FileUpload from './FileUpload';
import CourseInput from './CourseInput';
import GpaDisplay from './GpaDisplay';

import { Box, Typography, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800020',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#bfc1c2',
    },
  },
  typography: {
    fontFamily: ['Montserrat','sans-serif'].join(','),
    fontWeight: '300',
  },
});

function App() {
  
  const [courses, setCourses] = useState([]);
  const fileRef = useRef();
  const nameRef = useRef();
  const gradeRef = useRef();
  const unitsRef = useRef();
  

  function handleFileUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = fileRef.current.files[0];

    if (!file) {
      return;
    }
    
    reader.onloadend = function () {
      const base64string = reader.result.split(',')[1];
      fetch('https://macgradesweb.azurewebsites.net/api/upload', {
        method: 'POST',
        body: base64string,
        headers: {
          'Content-Type': 'text/plain'
        },
      })
      .then(response => response.json())
      .then(data => {
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
    reader.readAsDataURL(file);
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

  const gridStyling = {
    container: {
      paddingRight: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingTop: 2,
    }
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <header>
        <Typography variant='h3' align='center' gutterBottom color='primary' fontWeight='bold' >MacGrades</Typography>
        <Typography variant='h5' align='center' gutterBottom>Calculate your McMaster cGPA</Typography>
      </header>
      <main >
          <Grid container spacing={2} sx={gridStyling.container} > 
            <Grid container item xs={12} md={6} >
              <Grid item xs={12} md={12} >
                <GpaDisplay courses={courses} />
              </Grid>  
              <Grid item xs={12} md={6} >
                <CourseInput nameRef={nameRef} gradeRef={gradeRef} unitsRef={unitsRef} addCourse={addCourse} /> 
              </Grid>
              <Grid item xs={12} md={6} >
                <FileUpload fileRef={fileRef} handleFileUpload={handleFileUpload} />
              </Grid> 
            </Grid>
            <Grid item xs={12} md={6} >
              <CourseList courses={courses} deleteCourse={deleteCourse} clearCourses={clearCourses} />
            </Grid>
          </Grid>
      </main>
    </ThemeProvider>
  );
}

export default App;
