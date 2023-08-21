import React from 'react'
import { Typography } from '@mui/material'

import './Header.css'

const Header = () => {
    return (
        <header className='banner'>
            <Typography variant='h3' align='center' gutterBottom color='primary' fontWeight='bold' >MacGrades</Typography>
            <Typography variant='h5' align='center' gutterBottom>McMaster GPA Calculator</Typography>
        </header>
    )
}

export default Header