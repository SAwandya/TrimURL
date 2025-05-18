import React from "react";
import { Box, Typography } from "@mui/material";
import type { URL } from "../types";
import { formatDistanceToNow } from "date-fns";

interface URLStatsProps {
  url: URL;
}

const URLStats: React.FC<URLStatsProps> = ({ url }) => {
  // Check if URL has expired
  const isExpired = new Date(url.expiresAt) < new Date();

  // Format expiration time
  const expirationTime = formatDistanceToNow(new Date(url.expiresAt), {
    addSuffix: true,
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Clicks
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {url.clicks}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Created
        </Typography>
        <Typography variant="body2">
          {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Expires
        </Typography>
        <Typography
          variant="body2"
          color={isExpired ? "error.main" : "text.primary"}
        >
          {isExpired ? "Expired" : expirationTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default URLStats;
