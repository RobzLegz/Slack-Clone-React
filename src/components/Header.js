import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeaderLeft>
                <StyledAvatar src="" />
                <AccessTimeIcon />
            </StyledHeaderLeft>
            <StyledHeaderMiddle>
                <SearchIcon />
                <input type="text" placeholder="search papafam"/>
            </StyledHeaderMiddle>
            <StyledHeaderRight>
                <HelpOutlineIcon />
            </StyledHeaderRight>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    display:flex;
    position:fixed;
    width:100%;
    align-items:center;
    justify-content:space-between;
    padding:10px 0;
    background-color: var(--slack-color);
    color:#fff;
`;
const StyledHeaderLeft = styled.div`
    flex:0.3;
    display:flex;
    align-items:center;
    margin-left:20px;
    > .MuiSvgIcon-root{
        margin: 0 30px 0 auto;
    }
`;
const StyledHeaderMiddle = styled.div`
    flex: 0.4;
    display:flex;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    padding: 0 50px;
    color:gray;
    border:1px solid -ms-grid-layer;
    > input{
        background-color:transparent;
        border:none;
        text-align:center;
        min-width:30vw;
        outline:none;
        color: #fff;
    }
`;
const StyledHeaderRight = styled.div`
    flex: 0.3;
    align-items:flex-end;
    display:flex;
    > .MuiSvgIcon-root{
        margin-left:auto;
        margin-right:20px;
    }
`;
const StyledAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity:0.8;
    }
`;

export default Header
