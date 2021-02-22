import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => {
            alert(error.message);
        });
    };

    return (
        <StyledLoginPage>
            <img src="https://images.unsplash.com/photo-1476725994324-6f6833ea0631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" alt=""/>
            <StyledLoginContainer>
                <img src="https://foundercontent.com/static/media/slack_icon.55ad9eab.png" alt=""/>
                <h2>Sign in</h2>
                <p>bob.slack.com</p>
                <Button onClick={signIn} type="submit">Sign in With Google</Button>
            </StyledLoginContainer>            
        </StyledLoginPage>
    )
}
const StyledLoginPage = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color: #f8f8f8;
    width: 100%;
    >img{
        width:100%;
        position: absolute;
        height:100vh;
        object-fit:cover;
    }
`;
const StyledLoginContainer = styled.div`
    background-color: #fffdfd;
    height: 500px;
    width:500px;
    box-shadow: 3px 4px 4px 3px rgba(0,0,0,0.5);
    display:flex;
    padding:50px 30px;
    flex-direction:column;
    align-items:center;
    background: rgba( 255, 255, 255, 0.30 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 13.5px );
    -webkit-backdrop-filter: blur( 13.5px );
    border-radius: 30px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    >img{
        height: 100px;
    }
    >h2{
        margin-top: 30px;
        font-size: 30px;
    }
    >p{
        margin: 10px 0 0 0;
    }
    >button{
        margin-top: 100px;
        background-color: var(--slack-color);
        color: #fff;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.4s ease;
        :hover{
            background-color:#fff;
            color: var(--slack-color);
            font-size: 1.3rem;
            border: 2px solid var(--slack-color);
        }
    }
`;

export default Login
