import React from 'react';
import * as Mantine from '@mantine/core';
import styled from '@emotion/styled';


const StyledSingleFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 50px;
  &:hover {
    background-color: #f4f4f4;
  }
  .body {
    margin-left: 55px;
  }
`;

interface Props {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image?: string;
  };
}

export const SingleFeed : React.FC<Props & React.ComponentProps<typeof StyledSingleFeed>> = ({ postedAt, body, author, ...props }) => {
  return (
    <StyledSingleFeed {...props}>
      <Mantine.Group>
        <Mantine.Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Mantine.Text size="sm">{author.name}</Mantine.Text>
          <Mantine.Text size="xs" color="dimmed">{postedAt}</Mantine.Text>
        </div>
      </Mantine.Group>
      <Mantine.Text size="sm" className="body">
        {body}
      </Mantine.Text>
    </StyledSingleFeed>
  );
}