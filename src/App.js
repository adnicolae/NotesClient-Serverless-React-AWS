import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './components/auth-unauth-routes/auth-route.component';
import UnauthenticatedRoute from './components/auth-unauth-routes/unauth-route.component';
import onError from './helpers/onError';

import CurrentUserContext from './contexts/current-user.context';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import NotFound from './pages/notfound/notfound.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import CreateNote from './pages/create-note/create-note.component';
import NotePage from './pages/note/note.component';
import SettingsPage from './pages/settings/settings.component';
import { Auth } from 'aws-amplify';

const App = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (error) {
        if (error !== 'No current user') {
          onError(error);
        }
      }
      setIsAuthenticating(false);
    };

    getUserSession();
  }, [])

  return (
    !isAuthenticating && 
    <div className="App">
      <CurrentUserContext.Provider value={ { isAuthenticated, setIsAuthenticated }}>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <UnauthenticatedRoute path='/login'>
            <SignIn />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path='/signup'>
            <SignUp />
          </UnauthenticatedRoute>
          <AuthenticatedRoute exact path='/notes/new'>
            <CreateNote />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/notes/:id'>
            <NotePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/settings'>
            <SettingsPage />
          </AuthenticatedRoute>
          <Route component={ NotFound } />
        </Switch>
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
