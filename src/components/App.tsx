import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Slide, Flip } from "react-toastify";
import styled, { ThemeProvider } from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import theme from "../styles/theme";
import GlobalStyles from "../styles/GlobalStyles";
import Routes from "./Routes";
import { useTokenCheck } from "../hooks/useTokenCheck";
import Header from "./Header";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 55px;
`;

function App() {
  useTokenCheck();
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Header />
          <Container>
            <Routes />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer
        position={window.screen.width < 425 ? "top-center" : "bottom-left"}
        autoClose={2500}
        transition={window.screen.width < 425 ? Flip : Slide}
      />
    </>
  );
}

export default App;
