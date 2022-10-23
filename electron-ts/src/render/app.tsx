import styled from '@emotion/styled';
import React from 'react';
import { Navbar } from '@artizon/react-common/navbar';
import { Commentbox } from '@artizon/react-common/commentbox';


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const App : React.FC<{}> = ({}) => {
  return (
    <StyledApp>
      <Navbar/>
      <Commentbox/>
    </StyledApp>
  );
}

export default App;