import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material/';
import { styled } from '@mui/material/styles';

export default function FileUpload({ fileRef, handleFileUpload }) {
    
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setSelectedFileName('');
            return;
        }
        setSelectedFileName(file.name);
    };

    const handleSubmitBtn = (event) => {
        event.preventDefault();
        handleFileUpload(event);
        setSelectedFileName('');
    };

    return (
        <Card sx={{ minHeight: 250 }} >
            <CardContent >
                <Grid container wrap='nowrap' justifyContent='flex-end' direction='column' alignItems='center' spacing={7} >
                    <Grid item xs >
                        <Button variant='contained' component='label' >
                            Upload Transcript
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
