import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import type { URL } from "../types";
import { formatDistanceToNow } from "date-fns";

interface URLStatsProps {
  url: URL;
}

const URLStats: React.FC<URLStatsProps> = ({ url }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Check if URL has expired
  const isExpired = new Date(url.expiresAt) < new Date();

  // Format expiration time
  const expirationTime = formatDistanceToNow(new Date(url.expiresAt), {
    addSuffix: true,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 1, sm: 2 },
        mt: { xs: 0.5, sm: 1 },
        justifyContent: { xs: "flex-start", sm: "flex-start" }, // Align items to start
      }}
    >
      <Box sx={{ textAlign: { xs: "left", sm: "left" } }}>
        <Typography
          variant={isMobile ? "overline" : "caption"}
          color="text.secondary"
          sx={{ fontSize: isMobile ? "0.65rem" : "0.75rem" }}
        >
          Clicks
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          fontWeight="bold"
          sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
        >
          {url.clicks}
        </Typography>
      </Box>

      <Box sx={{ textAlign: { xs: "left", sm: "left" } }}>
        <Typography
          variant={isMobile ? "overline" : "caption"}
          color="text.secondary"
          sx={{ fontSize: isMobile ? "0.65rem" : "0.75rem" }}
        >
          Created
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          sx={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}
        >
          {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      <Box sx={{ textAlign: { xs: "left", sm: "left" } }}>
        <Typography
          variant={isMobile ? "overline" : "caption"}
          color="text.secondary"
          sx={{ fontSize: isMobile ? "0.65rem" : "0.75rem" }}
        >
          Expires
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          color={isExpired ? "error.main" : "text.primary"}
          sx={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}
        >
          {isExpired ? "Expired" : expirationTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default URLStats;
