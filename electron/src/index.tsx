import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { MantineProvider } from '@mantine/core';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS
    theme={{
      colorScheme: 'light',
      colors: {
        // Custom color
        // deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        // Overwrite default theme color
        blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
      },

      shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
      },

      loader: "bars",

      headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
          h1: { fontSize: 30 },
        },
      },

      globalStyles: theme => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        },
      }),
    }}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);