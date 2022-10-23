import styled from '@emotion/styled';
import React from 'react';
import { Navbar } from '@artizon/react-common/navbar';
import { Commentbox } from '@artizon/react-common/commentbox';
import { Feed } from '@artizon/react-common/feed';


const StyledApp = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 80vh 20vh;
  grid-template-areas:
    "navbar feed"
    "navbar commentbox"
  ;
  .navbar {
    grid-area: navbar !important
  }
  .commentbox {
    grid-area: commentbox !important
  }
  .feed {
    grid-area: feed !important
  }
`;


const App : React.FC<{}> = ({}) => {
  return (
    <StyledApp>
      <Navbar className="navbar"/>
      <Commentbox className="commentbox"/>
      <Feed className="feed"/>
    </StyledApp>
  );
}

export default App;