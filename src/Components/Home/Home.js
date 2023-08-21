import React, { useState } from 'react'
import { CourseListContext } from '../../Contexts/CourseListContext'
import CourseList from './CourseList'
import FileUpload from './FileUpload'
import CourseInput from './CourseInput'
import GpaDisplay from './GpaDisplay'

import './Home.css'

const Home = () => {
    
    const [courses, setCourses] = useState([])

    return (
        <div className='home-container' >
            <CourseListContext.Provider value={[courses, setCourses]}>
                <div className='home-content' >
                    <div className='left'>
                        <div className='left-top'>
                            <GpaDisplay/>
                        </div>
                        <div className='left-bottom'>
                            <CourseInput/>
                            <FileUpload/>
                        </div>
                    </div>
                    <div className='right'>
                        <CourseList/>
                    </div>
                </div>
            </CourseListContext.Provider>
        </div>
    )
}

export default Home