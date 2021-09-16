import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/starred" exact>
        <Starred />
      </Route>
      <Route>
        <center>This Is 404 Brick Not Found xD Lmao Ded...</center>
      </Route>
    </Switch>
  );
}

export default App;
