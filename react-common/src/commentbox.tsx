// import React from 'react';
// import { useState } from 'react';
// import MarkdownEditor from '@uiw/react-markdown-editor';

// export const Commentbox : React.FC = () => {
//   const [markdown, setMarkdown] = useState("");
//   return (
//     <MarkdownEditor
//       value=""
//       onChange={(value, viewUpdate) => setMarkdown(value)}
//     />
//   );
// }

import React, { useState } from 'react';
import { RichTextEditor } from '@mantine/rte';


export const Commentbox : React.FC<React.ComponentProps<typeof RichTextEditor>> = ({ ...props }) => {
  const [value, onChange] = useState("");
  return <RichTextEditor value={value} onChange={onChange} {...props} />;
}