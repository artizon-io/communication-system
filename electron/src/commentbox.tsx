import React from 'react';
import { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const Commentbox : React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  return (
    <MarkdownEditor
      value=""
      onChange={(value, viewUpdate) => setMarkdown(value)}
    />
  );
}

export default Commentbox;