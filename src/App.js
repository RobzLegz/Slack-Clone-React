import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

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
                <Chat />
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
