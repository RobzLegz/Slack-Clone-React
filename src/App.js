import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
