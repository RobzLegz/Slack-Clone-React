import React from 'react'
import styled from 'styled-components';
import * as timeago from 'timeago.js';

const Message = ({message,timestamp,user,userImage}) => {
    return (
        <StyledMessage>
            <StyledUserImage src={userImage} />
            <StyledMessageContainer>
                <h3>{user}</h3>
                <p>{message}</p>
                <StyledTimestampContainer>
                    <p>{timeago.format(new Date(timestamp?.toDate()).toLocaleString())}</p>
                </StyledTimestampContainer>
            </StyledMessageContainer>
        </StyledMessage>
    )
}
const StyledMessage = styled.div`
    display:flex;
    width:100%;
    padding:20px 10px;
    height:fit-content;
    color:#000;
    :hover{
        background-color:#eeeaea;
    }
    border-bottom:1px solid lightgrey;
`;
const StyledMessageContainer = styled.div`
    margin-left:15px;
    height: fit-content;
    width: 80%;
    position: relative;
`;
const StyledTimestampContainer = styled.div`
    margin:0 50%;
    min-width:200px;
    position:absolute;
    height: 30px;
    background-color:#fff;
    z-index:30;
    top:110%;
    display:flex;
    justify-content:center;
    border:1px solid lightgrey;
    align-items:center;
    border-radius: 30px;
`;
const StyledUserImage = styled.img`
    height:50px;
    border-radius:8px;
    width: 50px;
    object-fit:cover;
`;

export default Message
