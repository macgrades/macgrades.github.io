import React from 'react'


export default function FileUpload({ fileRef, handleFileUpload }) {
    return (
        <>
            <input ref={fileRef} type="file" id="transcriptFile" name="pdfFile" accept=".pdf" />
            <button id="submitBtn" onClick={handleFileUpload}>Submit</button>
        </>
  )
}
