import React from 'react';
import { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

export const Commentbox : React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  return (
    <MarkdownEditor
      value=""
      onChange={(value, viewUpdate) => setMarkdown(value)}
    />
  );
}