import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from "./theme/ThemeUI";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/Toast";

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeProvider>
        </ChakraProvider>
      </BrowserRouter>

    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
