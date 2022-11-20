import React from 'react';
import styled from '@emotion/styled';


const StyledTitlebar = styled.div`
`;

interface Props {
}

export const SingleTitlebar : React.FC<Props & React.ComponentProps<typeof StyledTitlebar>> = ({ ...props }) => {
  return (
    <StyledTitlebar {...props}>
    </StyledTitlebar>
  );
}