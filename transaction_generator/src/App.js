import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import TranGen from './tranGen';

const themeDark = createTheme({
  palette: {
    background: {
      default: "#05182b",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
        <Container maxWidth="lg" >
          <TranGen />
        </Container>
    </ThemeProvider>
  );
};

export default App;
