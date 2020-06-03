import React from 'react'
import { Link } from 'react-router-dom';
import './notfound.styles.scss'

const NotFound = () => {
  return (
    <div className='not-found'>
      <h3>Sorry, page not found!</h3>
      <h4>Return to <Link to='/'>Home Page</Link></h4>
    </div>
  )
}

export default NotFound;
