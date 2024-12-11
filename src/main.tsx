import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from "./theme/ThemeUI";

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
