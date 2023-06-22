import React from 'react'
import Course from './Course';

export default function CourseList({ courses, deleteCourse }) {
  return (
    
    courses.map(course => {
        return <Course key={course.id} course={course} deleteCourse={deleteCourse} />;
    })
    
  )
}
