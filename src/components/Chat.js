import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';
import {roomId, selectRoomId} from "../features/appSlice"
import { useSelector } from 'react-redux';
import db, { auth } from '../firebase';
import firebase from "firebase";
import { selectUser } from '../features/userSlice';
import MicIcon from '@material-ui/icons/Mic';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Chat = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const roomId = useSelector(selectRoomId);
    const [roomInfo, setRoomInfo] = useState("");
    const lastMessage = useRef(null);
    const user = useSelector(selectUser);

    recognition.onresult = function(event){
        const iSaidText = event.results[0][0].transcript;
        textSetMic(iSaidText);
    };

    const speakingFunction = () => {
        recognition.start();
    }

    const textSetMic = (recordedMessage) => {
        setMessage(recordedMessage);
        if(recordedMessage.includes("clear")){
            setMessage("");
        }else if(recordedMessage.includes("sign out")){
            auth.signOut();
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message !== ""){
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photo, 
            })
            setMessage("");
        }else{
            return;
        }
        lastMessage?.current?.scrollIntoView({
            behavior: "smooth",
        });
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
        setTimeout(() => {
            lastMessage?.current?.scrollIntoView({
                behavior: "smooth",
            });
        }, 1000);
    }, [roomId]); 

    return (
        roomId ? (
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
                    <ChatBottom ref={lastMessage}></ChatBottom>
                </StyledChatMessages>
                <form>
                    <StyledChatInput value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`message #${roomInfo}`} type="text" />
                    <button className="send-button" onClick={sendMessage} type="submit"><SendIcon /></button>
                    <Button className="mic-button" onClick={speakingFunction} style={{display:"flex", width:"30px",height:"50px", borderRadius:"30px"}}><MicIcon style={{fontSize:"30px", cursor: "pointer"}} /></Button>
                </form>
            </StyledChat>
        ) : (
            <StyledNothing>
                <p>Select a channel you want to go to</p>
            </StyledNothing>
        )
    )
}
const StyledChat = styled.div`
    position: relative;
    flex:1;
    height: calc(100vh - 60px);
    margin-top: 60px;
    background-color:#fff;
    background-color: #363636;
    display:flex;
    flex-direction:column;
    align-items:center;
    >form{
        align-items:center;
        display:flex;
        justify-content:space-between;
        height:fit-content;
        position: fixed;
        width: 80%;
        bottom: 20px;
        background-color:#fff;
    }
    .send-button{
        background-color:green;
        color:#fff;
        display: flex;
        height:40px;
        width:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        outline:none;
        border:none;
        cursor: pointer;
    }
    .mic-button{
        color:#000;
    }
`;
const StyledChatHeader = styled.div`
    display:flex;
    justify-content:space-between;
    height:60px;
    width:100%;
    align-items:center;
    border-bottom: 2px solid lightgrey;
    color: #c651cd;
    >.channel-name > h4{
        margin-bottom:-2px;
        color: #c651cd;
    }
    >.channel-name>small{
        color: #8739f9;
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
    background-color: #363636;
    width:100%;
    overflow-y:scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    ::-webkit-scrollbar {
        display: none;
    }
`;
const StyledChatInput = styled.input`
    width:95%;
    height:50px;
    font-size:1rem;
    padding:0 20px;
    outline:none;
    background-color:#fff;
    border:none;
`;
const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
const StyledNothing = styled.div`
    display:grid;
    place-items:center;
    flex: 1;
    background-color:#363636;
    >p{
        font-size: 26px;
        color: #c651cd;
    }
`;

export default Chat
