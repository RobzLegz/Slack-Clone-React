import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import db from '../firebase';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GroupIcon from '@material-ui/icons/Group';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AppsIcon from '@material-ui/icons/Apps';
import AirplayIcon from '@material-ui/icons/Airplay';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const user = useSelector(selectUser);

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if(channelName){
            db.collection("rooms").add({
                name: channelName,
            });
        }
        return;
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
                    <h2>Web Dev Group</h2>
                    <ExpandMoreIcon />
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeadeer>
            <SidebarOption Icon={CommentRoundedIcon} title="Threads" />
            <SidebarOption Icon={AirplayIcon} title="Mentions & reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved items" />
            <SidebarOption Icon={BookmarkIcon} title="Channel browser" />
            <SidebarOption  Icon={GroupIcon} title="People & user groups"/>
            <SidebarOption  Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File browser" />
            <hr/>
            <StyledAddChannel>
                <ExpandMoreIcon />
                Channels
            </StyledAddChannel>
            <hr/>
            <StyledAddChannel style={{cursor: "pointer", height: "40px", border: "1px solid #6e6e6e", borderLeft: "none", borderRight: "none"}} onClick={addChannel}>
                <AddIcon />
                Add Channel
            </StyledAddChannel>
            <StyledRooms>
                {rooms?.map((room) => (
                    <SidebarOption key={room?.id} id={room?.id} title={room?.data?.name}/>
                ))}
            </StyledRooms>
            <hr/>
            <StyledAddChannel>
                <ExpandMoreIcon />
                Direct Messages
            </StyledAddChannel>
            <hr/>
            <StyledAddChannel style={{marginTop: "20px"}}>
                <img src={user?  user?.photo : "https://i.stack.imgur.com/34AD2.jpg"} alt={user?.displayName}/>
                <p>{user ? user?.displayName : "Robert"}</p>
            </StyledAddChannel>
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
const StyledRooms = styled.div`
    overflow-y: scroll;
    height: 40vh;
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    ::-webkit-scrollbar {
        display: none;
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
    display:flex;
    align-items:center;
    color: #e9e5e5;
    height:20px;
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
const StyledAddChannel = styled.div`
    display:flex;
    align-items:center;
    color: #bdbbbb;
    padding-left:10px;
    height: 20px;
    font-weight: 500;
    >img{
        width:30px;
        margin: 0 20px;
        border-radius: 5px;
    }
`;

export default Sidebar
