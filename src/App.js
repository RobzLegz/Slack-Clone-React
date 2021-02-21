import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      }else{
        dispatch(logout());
      }
    });
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <BrowserRouter>
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/">              
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        </BrowserRouter>
      )}
    </div>
  );
}

const AppBody = styled.div`
  display:flex;
  height:100vh;
  width:100%;
`;

export default App;
