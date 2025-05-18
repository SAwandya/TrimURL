import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import theme from "./theme";
import Header from "./components/Header";
import URLForm from "./components/URLForm";
import URLList from "./components/URLList";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<AddLinkIcon />}
            sx={{
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontSize: "1rem",
            }} // Styled button
          >
            Shorten New URL
          </Button>
        </Box>
        <URLForm open={isModalOpen} onClose={handleCloseModal} />
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
