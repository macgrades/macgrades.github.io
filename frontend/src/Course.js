import React from 'react'

export default function Course({course, deleteCourse}) {
  return (
    <div>
        {course.code}, {course.grade}, {course.units}
        <button onClick={() => deleteCourse(course.id)}>X</button>
    </div>
  )
}


