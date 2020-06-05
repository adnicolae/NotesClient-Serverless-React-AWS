import React, { useContext } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user.context';

const AuthenticatedRoute = ({ children, ...props }) => {
  const { isAuthenticated } = useContext(CurrentUserContext);
  const { pathname, search } = useLocation();

  return (
    <Route { ...props }>
      {
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={ `/login?redirect=${ pathname }${ search }`} />
        )
      }
    </Route>
  )
}

export default AuthenticatedRoute;
