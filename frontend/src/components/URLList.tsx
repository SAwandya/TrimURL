import React, { useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useUrlStore } from "../store/urlStore";
import URLListItem from "./URLListItem";

const URLList: React.FC = () => {
  const { urls, loading, error, fetchUrls } = useUrlStore();

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  if (loading && urls.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (urls.length === 0) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography color="text.secondary">
          No URLs have been shortened yet. Create your first one above!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Your Shortened URLs
      </Typography>

      {urls.map((url) => (
        <URLListItem key={url.id} url={url} />
      ))}
    </Box>
  );
};

export default URLList;
