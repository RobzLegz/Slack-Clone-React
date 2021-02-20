import React from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
                
            </StyledChatMessages>
            <StyledChatInput>

            </StyledChatInput>
        </StyledChat>
    )
}
const StyledChat = styled.div`
    flex:1;
    height: calc(100vh - 60px);
    margin-top: 60px;
    background-color:#fff;
`;
const StyledChatHeader = styled.div`
    display:flex;
    justify-content:space-between;
    height:60px;
    align-items:center;
    >.channel-name > h4{
        margin-bottom:-2px;
    }
    >div{
        margin: 0 20px;
    }
`;
const StyledChatMessages = styled.div`

`;
const StyledChatInput = styled.div`

`;

export default Chat
