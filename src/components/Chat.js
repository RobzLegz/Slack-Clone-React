import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';
import {roomId, selectRoomId} from "../features/appSlice"
import { useSelector } from 'react-redux';
import db from '../firebase';
import firebase from "firebase";
import { selectUser } from '../features/userSlice';
import MicIcon from '@material-ui/icons/Mic';
import { Button } from '@material-ui/core';

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
        readOutLoud(iSaidText);
    };

    const speakingFunction = () => {
        recognition.start();
    }

    const readOutLoud = (recordedMessage) => {
        const speech = new SpeechSynthesisUtterance();
        setMessage(recordedMessage);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photo,
        })
        setMessage("");
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
                    <button onClick={sendMessage} type="submit">Submit</button>
                    <Button onClick={speakingFunction} style={{display:"flex", width:"30px",height:"50px", borderRadius:"30px"}}><MicIcon style={{fontSize:"30px", cursor: "pointer"}} /></Button>
                </form>
            </StyledChat>
        ) : (
            <StyledNothing>
                <p>Select a achannel you want to go to</p>
            </StyledNothing>
        )
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
    overflow-y:scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    ::-webkit-scrollbar {
        display: none;
    }
`;
const StyledChatInput = styled.input`
    width:90%;
    height:50px;
    font-size:1rem;
    padding:0 20px;
    outline:none;
    border-radius:10px;
    background-color:#fff;
    border: 1px solid #000;
`;
const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
const StyledNothing = styled.div`
    display:grid;
    place-items:center;
    flex: 1;
    >p{
        font-size: 24px;
    }
`;

export default Chat
