import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <LinkContainer to='/signup'>
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header;
