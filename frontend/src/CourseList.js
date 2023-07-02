import React from 'react'

import { Button, IconButton, Table, TableBody, TableCell, 
        TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CourseList({ courses, deleteCourse, clearCourses }) {
  return (
    <Card>
      <CardContent>
        <Paper sx={{ overflow: 'hidden', minWidth: 440}} >
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                      <Button variant='outlined' color='primary' onClick={clearCourses}>Clear</Button>
                  </TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell align="right">Units</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow
                    key={course.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton color='secondary' onClick={() => deleteCourse(course.id)}> 
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="course">
                      {course.code}
                    </TableCell>
                    <TableCell align="right">{course.grade}</TableCell>
                    <TableCell align="right">{course.units}</TableCell>
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
