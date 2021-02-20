import { Avatar } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Message = ({message,timestamp,user,userImage}) => {
    return (
        <StyledMessage>
            <Avatar src={userImage} />
            <StyledMessageContainer>
                <h3>{user}</h3>
                <p>{message}</p>
            </StyledMessageContainer>
        </StyledMessage>
    )
}
const StyledMessage = styled.div`
    display:flex;
    width:100%;
    padding:20px 10px;
    height:fit-content;
    :hover{
        background-color:#eeeaea;
    }
`;
const StyledMessageContainer = styled.div`
    margin-left:15px;
    height: fit-content;
    width: 80%;
`;

export default Message
