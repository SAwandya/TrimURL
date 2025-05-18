import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import URLForm from "./components/URLForm";
import URLList from "./components/URLList";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <URLForm />
        <URLList />

        <Box sx={{ mt: 6, mb: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            URL Shortener App — {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
