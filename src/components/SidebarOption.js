import React from 'react'
import styled from 'styled-components';
import db from "../firebase";

const SidebarOption = ({title, addChannelOption}) => {    

    const selectChannel = () => {

    }

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if(channelName){
            db.collection("rooms").add({
                name: channelName,
            });
        }
    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            <SidebarOptionChannel>
                <span>#</span>
                <h3>{title}</h3>
            </SidebarOptionChannel>
        </SidebarOptionContainer>
    )
}
const SidebarOptionContainer = styled.div`
    display:flex;
    font-size:12px;
    align-items:center;
    padding-left:2px;
    cursor: pointer;
    :hover{
        opacity:0.8;
        background-color:#14be36
    }
    >h3{
        font-weight: 500;
    }
    >h3 > span{
        padding:15px;
    }
`;
const SidebarOptionChannel = styled.h3`
    padding: 10px;
    font-weight:300;
`;

export default SidebarOption
