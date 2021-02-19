import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeaderLeft>
                <Avatar />
            </StyledHeaderLeft>
            <StyledHeaderMiddle>

            </StyledHeaderMiddle>
            <StyledHeaderRight>

            </StyledHeaderRight>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    
`;
const StyledHeaderLeft = styled.div`

`;
const StyledHeaderMiddle = styled.div`

`;
const StyledHeaderRight = styled.div`

`;

export default Header
