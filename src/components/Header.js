import React from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

const Header = () => {

    const user = useSelector(selectUser);

    return (
        <StyledHeader>
            <StyledHeaderLeft>
                <AccessTimeIcon />
            </StyledHeaderLeft>
            <StyledHeaderMiddle>
                <SearchIcon />
                <input type="text" placeholder="search Web Dev Group"/>
            </StyledHeaderMiddle>
            <StyledHeaderRight>                
                <HelpOutlineIcon />
                <StyledAvatar onClick={() => auth.signOut()} src={user ? user?.photo : "https://i.stack.imgur.com/34AD2.jpg"} />
            </StyledHeaderRight>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    position: fixed;
    display:flex;
    width:100%;
    align-items:center;
    justify-content:space-between;
    padding:10px 0;
    background-color: var(--slack-color);
    color:#fff;
    height:60px;
    z-index:100;
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
    display:flex;
    align-items:center;
    justify-content: space-between;
    > .MuiSvgIcon-root{
        margin-left:20px;
        font-size:30px;
    }
`;
const StyledAvatar = styled.img`
    cursor: pointer;
    display:flex;
    margin-right:20px;
    height: 40px;
    border-radius: 3px;
    :hover{
        opacity:0.8;
    }
`;

export default Header
