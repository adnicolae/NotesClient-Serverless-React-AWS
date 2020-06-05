import React, { useContext } from 'react'
import CurrentUserContext from '../../contexts/current-user.context';
import { Route, Redirect } from 'react-router-dom';

const parseQueryString = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results){
    return null;
  }

  if (!results[2]) {
    return "";
  }
  console.log(results);
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute = ({ children, ...props }) => {
  const { isAuthenticated } = useContext(CurrentUserContext);
  const redirect = parseQueryString("redirect");

  return (
    <Route { ...props }>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )
      }
    </Route>
  )
}

export default UnauthenticatedRoute;
