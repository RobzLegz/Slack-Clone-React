import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './Home';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>              
                <Home />
              </Route>
            </Switch>
          </AppBody>
        </>
      </BrowserRouter>
    </div>
  );
}

const AppBody = styled.div`
  display:flex;
  height:100vh;
  width:100%;
`;

export default App;
