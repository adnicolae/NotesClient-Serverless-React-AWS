import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <Link to='/'>
            Notely ✒
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
    </div>
  )
}

export default Header;
