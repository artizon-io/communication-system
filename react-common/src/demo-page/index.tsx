import React from 'react';
import styled from '@emotion/styled';


const StyledDemoPage = styled.div`
`;

interface Props {
}

export const DemoPage : React.FC<Props & React.ComponentProps<typeof StyledDemoPage>> = ({ ...props }) => {
  return (
    <StyledDemoPage {...props}>
    </StyledDemoPage>
  );
}