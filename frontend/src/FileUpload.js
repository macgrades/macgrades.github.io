import React from 'react'
import { Button, Card, CardContent, Input } from '@mui/material/';


export default function FileUpload({ fileRef, handleFileUpload }) {
    return (
        <Card>
            <CardContent>
                <Input inputRef={fileRef} type="file" id="transcriptFile" name="pdfFile" accept=".pdf" />
                <Button variant='contained' id="submitBtn" onClick={handleFileUpload}>Submit</Button>
            </CardContent>
        </Card>
  )
}
