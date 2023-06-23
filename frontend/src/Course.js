import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Course({course, deleteCourse}) {
  return (
    <div>
        {course.code}, {course.grade}, {course.units}
        <IconButton color='secondary' onClick={() => deleteCourse(course.id)}> 
          <DeleteIcon />
        </IconButton>
    </div>
  )
}


