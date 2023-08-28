import React, { useContext } from 'react'
import { CourseListContext } from '../../Contexts/CourseListContext'

import {
  Button, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Card, CardContent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CourseList() {

  const [courses, setCourses] = useContext(CourseListContext);

  const deleteCourse = (id) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
  }

  const clearCourses = () => {
    setCourses([]);
  }

  return (
    <Card sx={{
      height: '100%',
      maxHeight: '100%',
    }} >
      <CardContent sx={{
      height: '100%',
      maxHeight: '100%',
    }}  >
        <Paper sx={{
          maxHeight:'100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <TableContainer  >
            <Table stickyHeader size="small" aria-label="simple table" >
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
                    <TableCell component="th" scope="course" sx={{ fontWeight: 'bold' }} >
                      {course.code}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} >{course.grade}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} >{course.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </CardContent>
      <span/>
    </Card>

  );
}
