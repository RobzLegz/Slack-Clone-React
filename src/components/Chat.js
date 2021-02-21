import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';
import {roomId, selectRoomId} from "../features/appSlice"
import { useSelector } from 'react-redux';
import db from '../firebase';
import firebase from "firebase";

const Chat = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const roomId = useSelector(selectRoomId);
    const [roomInfo, setRoomInfo] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: "Bigger Bob",
            userImage: "https://lh3.googleusercontent.com/proxy/gphy2F8BbQv4o-LSEABTHLogP4w-HeOmQdFZrMQIr-oI-p-eqmJj4Bvr-bZ3L9wh9Y0HuXKSciN4iUdFoMbqi1fDOI9ojV8wJ_22enGh-tQ",
        })
        setMessage("");
    }

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
                setRoomInfo(snapshot.data().name);
            });
        }
    }, [roomId]); 

    return (
        <StyledChat>
            <StyledChatHeader>
                <div className="channel-name">
                    <h4>#{roomInfo}</h4>
                    <small>Add a topic</small>
                </div>
                <div className="chatHeader-right">
                    <PersonAddOutlinedIcon />
                    <InfoOutlinedIcon />
                </div>
            </StyledChatHeader>
            <StyledChatMessages>
                {messages.map((send) => (
                    <Message 
                        message={send.message} 
                        timestamp={send.timestamp} 
                        user={send.user} 
                        userImage={send.userImage} 
                        key={send.id}
                        id={send.id}
                    />
                ))}
            </StyledChatMessages>
            <form>
                <StyledChatInput value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`message #${roomInfo}`} type="text" />
                <button onClick={sendMessage} type="submit">Submit</button>
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
