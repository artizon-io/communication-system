import React from 'react';
import styled from '@emotion/styled';
// import Logo from "@assets/logo.svg";


const StyledLogo = styled.div`
`;

interface Props {
}

export const SingleFeed : React.FC<Props & React.ComponentProps<typeof StyledLogo>> = ({ ...props }) => {
  return (
    <StyledLogo {...props}>

    </StyledLogo>
  );
}