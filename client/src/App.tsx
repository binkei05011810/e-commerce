import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import './App.css'
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
