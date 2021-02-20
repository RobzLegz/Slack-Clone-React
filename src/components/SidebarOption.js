import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import db from "../firebase";

const SidebarOption = ({title, Icon,id}) => {    
    return (
        <SidebarOptionContainer>
            {Icon && <Icon fontSize="small" style={{padding:"10px"}} />}
            {Icon ? (
                <Link>
                    <SidebarOptionChannel>
                        <Icon fontSize="small" />
                        <h3>{title}</h3>
                    </SidebarOptionChannel>
                </Link>
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
    >h3{
        margin-left:5px;
        font-weight: 400;
    }
`;

export default SidebarOption
