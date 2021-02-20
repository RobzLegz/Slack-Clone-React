import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import db from '../firebase';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import AddIcon from '@material-ui/icons/Add';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if(channelName){
            db.collection("rooms").add({
                name: channelName,
            });
        }
    };

    useEffect(() => {
        db.collection("rooms").onSnapshot((snapshot) => (
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
    }, []);

    return (
        <SidebarContainer>
            <SidebarHeadeer>
                <SidebarInfo>
                    <h2>PPA FAm</h2>
                    <FiberManualRecordIcon />
                    <p>Robert L</p>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeadeer>
            <SidebarOption Icon={CommentRoundedIcon} title="option" />
            <SidebarOption Icon={AlternateEmailRoundedIcon} title="option" />
            <SidebarOption Icon={MoreVertRoundedIcon} title="option"/>
            <hr/>
            <SidebarOption title="option"/>
            <hr/>
            <SidebarOption icon={AddIcon} title="Add channel" onClick={addChannel} />
            {rooms.map((room) => (
                <SidebarOption key={room.id} id={room.id} title={room.data.name}/>
            ))}
        </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
    color:#fff;
    background-color: var(--slack-color);
    flex:0.3;
    border-top:1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    >hr{
        margin: 10px;
        border: 1px solid #49274b;
    }
`;
const SidebarHeadeer = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    >.MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        background-color:#fff;
        border-radius:999px;
    }
`;
const SidebarInfo = styled.div`
    flex:1;
    >h2{
        font-size: 15px;
        font-weight:900;
        margin-top:5px;

    }
    >h3{
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items:center;
    }
    >h3 >.MuiSvgIcon-root{
        font-size:14px;
        margin-top:1px;
        margin-right:2px;
        color:green;
    }
`;

export default Sidebar
