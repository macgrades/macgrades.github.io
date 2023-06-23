import React from 'react'
import Button from '@mui/material/Button';


export default function FileUpload({ fileRef, handleFileUpload }) {
    return (
        <>
            <input ref={fileRef} type="file" id="transcriptFile" name="pdfFile" accept=".pdf" />
            <Button variant='contained' id="submitBtn" onClick={handleFileUpload}>Submit</Button>
        </>
  )
}
