import React, { useState, useRef, useContext } from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material/';
import { CourseListContext } from '../../Contexts/CourseListContext';

export default function FileUpload() {
    
    const [,setCourses] = useContext(CourseListContext);
    const fileRef = useRef();
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileUpload = (e) => {
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
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setSelectedFileName('');
            return;
        }
        setSelectedFileName(file.name);
    };

    const handleSubmitBtn = (e) => {
        e.preventDefault();
        handleFileUpload(e);
        setSelectedFileName('');
    };

    return (
        <Card sx={{ height: '100%', width: '50%', marginLeft: '20px' }} >
            <CardContent >
                <Grid container wrap='nowrap' justifyContent='flex-end' direction='column' alignItems='center' spacing={7} >
                    <Grid item xs >
                        <Button variant='contained' component='label' >
                            Select File
                            <input ref={fileRef} 
                            type="file" 
                            id="transcriptFile" 
                            name="pdfFile" 
                            accept='.pdf' 
                            style={{display: 'none'}}
                            onChange={handleFileChange} />
                        </Button>
                    </Grid>
                    <Grid item xs zeroMinWidth >
                        <Typography noWrap>
                            Selected file:
                            <span style={{ fontWeight: 'bold' }}> {selectedFileName} </span>
                        </Typography>
                    </Grid>
                    <Grid item xs >
                        <Button variant='contained' id="submitBtn" onClick={handleSubmitBtn}>Submit</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  )
}
