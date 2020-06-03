import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import NotFound from './pages/notfound/notfound.component';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
