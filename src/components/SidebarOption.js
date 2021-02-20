import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from '../features/appSlice';
import db from "../firebase";

const SidebarOption = ({title, Icon, id}) => {   

    const dispatch = useDispatch();
    
    const selectChannel = () => {
        if(id){
            dispatch(
                enterRoom({
                    roomId: id,
                })
            );
        }
    };
    
    return (
        <SidebarOptionContainer>
            {Icon && <Icon fontSize="small" style={{padding:"10px"}} />}
            {Icon ? (
                <SidebarOptionChannel onClick={selectChannel}>
                    <Icon fontSize="small" />
                    <h3>{title}</h3>
                </SidebarOptionChannel>
            ) : (
                <SidebarOptionChannel onClick={selectChannel}>
                    <span>#</span>
                    <h4>{title}</h4>
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}
const SidebarOptionContainer = styled.div`
    display:flex;
    font-size:12px;
    align-items:center;
    padding-left:2px;
    height: 30px;
    cursor: pointer;
    color: #bdbbbb;
    :hover{
        opacity:0.8;
        background-color:#311336
    }
    >a{
        color: #bdbbbb;
        text-decoration:none;
    }
    >h3{
        font-weight: 300;
    }
    >h3 > span{
        padding:15px;
        font-weight: 1000;
    }
`;
const SidebarOptionChannel = styled.h3`
    padding: 10px;
    font-weight:300;
    display: flex;
    align-items:center;
    width:100%;
    >h3{
        margin-left:5px;
        font-weight: 400;
    }
`;

export default SidebarOption
