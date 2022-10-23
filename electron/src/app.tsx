import styled from '@emotion/styled';
import React from 'react';
import Commentbox from './commentbox';
import Navbar from './navbar';


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const App : React.FC<{}> = ({}) => {
  return (
    <StyledApp>
      <Navbar/>
      {/* <Commentbox/> */}
    </StyledApp>
  );
}

export default App;