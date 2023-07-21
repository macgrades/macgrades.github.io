import React from 'react'

import { Button, IconButton, Table, TableBody, TableCell, 
        TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CourseList({ courses, deleteCourse, clearCourses }) {
  return (
    <Card sx={{ 
      
      
      //minWidth: 400,
      
      }} >
      <CardContent>
        <Paper sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          }} >
          <TableContainer sx={{ 
            flex: '1 1 auto',
            maxHeight: '100%',
            }} >
            <Table stickyHeader size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                      <Button variant='outlined' color='primary' onClick={clearCourses}>Clear</Button>
                  </TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Units</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow
                    key={course.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton color='primary' onClick={() => deleteCourse(course.id)}> 
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="course" sx={{fontWeight: 'bold'}} >
                      {course.code}
                    </TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} >{course.grade}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} >{course.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </CardContent>
    </Card>
    
  );
}
