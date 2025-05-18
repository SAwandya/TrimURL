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
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: { xs: 2, md: 4 },
          }}
        >
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<AddLinkIcon />}
            sx={{
              py: { xs: 1, md: 1.5 }, // Responsive padding
              px: { xs: 2, md: 4 }, // Responsive padding
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" }, // Responsive font size
              width: { xs: "100%", sm: "auto" }, // Full width on extra small, auto on others
            }}
          >
            Shorten New URL
          </Button>
        </Box>
        <URLForm open={isModalOpen} onClose={handleCloseModal} />
        <URLList />
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            mb: { xs: 2, md: 4 },
            textAlign: "center",
          }}
        >
          {" "}
          <Typography variant="body2" color="text.secondary">
            URL Shortener App — {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
