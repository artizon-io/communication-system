import React from 'react';
import styled from '@emotion/styled';
import { SingleFeed } from './single-feed';


const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const Feed : React.FC<React.ComponentProps<typeof StyledFeed>> = ({ ...props }) => {
  return (
    <StyledFeed {...props}>
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
      <SingleFeed postedAt='Yesterday' body='Hello world' author={{ name: 'User1' }} />
    </StyledFeed>
  )
}