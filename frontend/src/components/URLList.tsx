import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { useUrlStore } from "../store/urlStore";
import URLListItem from "./URLListItem";

const ITEMS_PER_PAGE = 5;

const URLList: React.FC = () => {
  const { urls, loading, error, fetchUrls } = useUrlStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const count = Math.ceil(urls.length / ITEMS_PER_PAGE);
  const paginatedUrls = urls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ mt: { xs: 2, sm: 0 } }}
      >
        Your Shortened URLs
      </Typography>

      {paginatedUrls.map((url) => (
        <URLListItem key={url.id} url={url} />
      ))}

      {count > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
          <Pagination
            count={count}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default URLList;
