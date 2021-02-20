import React from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';

const Chat = () => {
    return (
        <StyledChat>
            <StyledChatHeader>
                <div className="channel-name">
                    <h4>#dev-ops-101</h4>
                    <small>Add a topic</small>
                </div>
                <div className="chatHeader-right">
                    <PersonAddOutlinedIcon />
                    <InfoOutlinedIcon />
                </div>
            </StyledChatHeader>
            <StyledChatMessages>
                <Message />
            </StyledChatMessages>
            <form>
                <StyledChatInput placeholder="message #dev-ops" type="text" />
                <button type="submit">Submit</button>
            </form>
        </StyledChat>
    )
}
const StyledChat = styled.div`
    flex:1;
    height: calc(100vh - 60px);
    margin-top: 60px;
    background-color:#fff;
    >form{
        width:100%;
        align-items:center;
        display:flex;
        justify-content:center;
        height:fit-content;
    }
    >form>button{
        display:none;
    }
`;
const StyledChatHeader = styled.div`
    display:flex;
    justify-content:space-between;
    height:60px;
    width:100%;
    align-items:center;
    border-bottom: 2px solid lightgrey;
    >.channel-name > h4{
        margin-bottom:-2px;
    }
    >.chatHeader-right{
        width:60px;
        display:flex;
        justify-content:space-between;
    }
    >div{
        margin: 0 20px;
    }
`;
const StyledChatMessages = styled.div`
    height: calc(100vh - 200px);
    width:100%;
`;
const StyledChatInput = styled.input`
    width:90%;
    height:50px;
    font-size:1rem;
    padding:0 20px;
    outline:none;
    border-radius:10px;
`;

export default Chat
