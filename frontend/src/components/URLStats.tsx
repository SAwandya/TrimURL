import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Divider,
} from "@mui/material";
import type { URL } from "../types";
import { formatDistanceToNow } from "date-fns";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MouseIcon from "@mui/icons-material/Mouse";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-start",
        gap: { xs: 1.5, sm: 3 },
        mt: { xs: 1, sm: 1.5 },
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.02)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <MouseIcon fontSize="small" color="primary" />
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={500}
            sx={{ display: "block", mb: 0.25 }}
          >
            Clicks
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            fontSize={isMobile ? "0.95rem" : "1.1rem"}
            color="primary"
          >
            {url.clicks}
          </Typography>
        </Box>
      </Box>

      {!isMobile && (
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      )}
      {isMobile && <Divider sx={{ width: "100%", my: 0.5 }} />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CalendarTodayIcon fontSize="small" color="info" />
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={500}
            sx={{ display: "block", mb: 0.25 }}
          >
            Created
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
          >
            {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      {!isMobile && (
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      )}
      {isMobile && <Divider sx={{ width: "100%", my: 0.5 }} />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AccessTimeIcon
          fontSize="small"
          color={isExpired ? "error" : "success"}
        />
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={500}
            sx={{ display: "block", mb: 0.25 }}
          >
            Expires
          </Typography>
          <Chip
            size="small"
            label={isExpired ? "Expired" : expirationTime}
            color={isExpired ? "error" : "success"}
            variant="outlined"
            sx={{
              height: "auto",
              py: 0.1,
              fontSize: isMobile ? "0.75rem" : "0.8rem",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default URLStats;
