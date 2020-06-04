import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user.context';
import { Auth } from 'aws-amplify';

import './header.styles.scss';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(CurrentUserContext);
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();

    setIsAuthenticated(false);

    history.push('/login');
  };

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
            { isAuthenticated 
              ? <Nav.Link onClick={ handleLogout }>Logout</Nav.Link>
              : <>
                  <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header;
