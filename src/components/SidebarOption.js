import React from 'react'
import styled from 'styled-components';
import db from "../firebase";

const SidebarOption = ({title, Icon}) => {    
    return (
        <SidebarOptionContainer>
            {Icon && <Icon fontSize="small" style={{padding:"10px"}} />}
            {Icon ? (
                <SidebarOptionChannel>
                    <Icon fontSize="small" />
                    <h3>{title}</h3>
                </SidebarOptionChannel>
            ) : (
                <SidebarOptionChannel>
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
    :hover{
        opacity:0.8;
        background-color:#311336
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
    display: flex;
    align-items:center;
    >h3{
        margin-left:5px;
    }
`;

export default SidebarOption
