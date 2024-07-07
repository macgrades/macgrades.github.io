import React, { useState, useRef, useContext } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material/';
import { CourseListContext } from '../../Contexts/CourseListContext';

export default function FileUpload() {

  const [, setCourses] = useContext(CourseListContext);
  const fileRef = useRef();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (errorMessage) {
    fileRef.current.value = null;
  }

  const handleFileUpload = (e) => {
    e.preventDefault();
      
    const reader = new FileReader();
    const file = fileRef.current.files[0];
    setErrorMessage('');

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Error: File is not a PDF');
      return;
    }
    const MAX_FILE_SIZE = 1024 ** 2; // 1MB
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('Error: File is too large');
      return;
    }

    setLoading(true);
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
          if (data.length === 0) {
            setErrorMessage('Unknown Error');
            setLoading(false);
            fetch('https://macgradesweb.azurewebsites.net/api/log-error', {
              method: 'GET',
            });
            console.log("Error: No courses found in transcript");
            return;
          }
          data.forEach(course => {
            course.id = crypto.randomUUID();
          });
          setCourses(prevCourses => [...prevCourses, ...data]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setErrorMessage('Unknown Error');
          setLoading(false);
        });
      fileRef.current.value = null;
    }
    reader.readAsDataURL(file);
  }

  const trimFileName = (fileName) => {
    if (fileName.length > 15) {
      return fileName.substring(0, 15) + '..' + fileName.substring(fileName.length - 4);
    }
    return fileName;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFileName('');
      return;
    }
    setErrorMessage('');
    setSelectedFileName(trimFileName(file.name));
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    handleFileUpload(e);
    setSelectedFileName('');
  };

  return (
    <Card sx={{ minHeight: '100%', width: '50%', marginLeft: '20px' }} >
      <CardContent sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', minHeight: '100%'}} >
          <Button variant='contained' component='label' >
            Select File
            <input ref={fileRef}
              type="file"
              id="transcriptFile"
              name="pdfFile"
              accept='.pdf'
              style={{ display: 'none' }}
              onChange={handleFileChange} />
          </Button>
          <Typography noWrap>
            Selected file:
            <span style={{ fontWeight: 'bold' }}> {errorMessage ? <span style={{color: 'red'}}>{errorMessage}</span> : selectedFileName} </span>
          </Typography>
          <Button variant='contained' id="submitBtn" onClick={handleSubmitBtn}>{loading ? <>Loading...</> : <>Submit</>}</Button>
      </CardContent>
    </Card>
  )
}
