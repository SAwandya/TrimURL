import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  useMediaQuery,
  Theme,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const Header: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LinkIcon sx={{ mr: 2, fontSize: isMobile ? 24 : 30 }} />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            sx={{ fontWeight: 700 }}
          >
            URL Shortener
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
