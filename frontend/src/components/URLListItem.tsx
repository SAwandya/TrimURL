import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Collapse,
  TextField,
  InputAdornment,
  Chip, 
  useTheme, 
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Import OpenInNewIcon
import type { URL } from "../types";
import { useUrlStore } from "../store/urlStore";
import CopyButton from "./CopyButton";
import URLStats from "./URLStats";

interface URLListItemProps {
  url: URL;
}

const URLListItem: React.FC<URLListItemProps> = ({ url }) => {
  const [expanded, setExpanded] = useState(false);
  const [extensionHours, setExtensionHours] = useState<number>(24);
  const theme = useTheme(); // Hook to access theme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile screens

  const { deleteUrl, extendUrl } = useUrlStore();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      deleteUrl(url.urlCode);
    }
  };

  const handleExtend = () => {
    extendUrl(url.urlCode, { expiresIn: extensionHours });
    setExpanded(false);
  };

  // Check if URL has expired
  const isExpired = new Date(url.expiresAt) < new Date();

  return (
    <Card
      sx={{
        mb: 2,
        opacity: isExpired ? 0.6 : 1,
        borderLeft: isExpired
          ? `4px solid ${theme.palette.error.main}`
          : `4px solid ${theme.palette.primary.main}`,
        transition: "opacity 0.3s ease-in-out, border-left 0.3s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Column on small, row on medium and up
            alignItems: { md: "center" }, // Align items center on medium and up
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Box sx={{ flexGrow: 1, minWidth: 0 /* Prevents overflow */ }}>
            <Tooltip title={url.originalUrl} placement="top-start">
              <Typography
                variant={isMobile ? "subtitle2" : "body1"}
                sx={{
                  fontWeight: 500,
                  mb: 0.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  cursor: "default",
                }}
              >
                {url.originalUrl}
              </Typography>
            </Tooltip>

            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography
                component="a"
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant={isMobile ? "caption" : "body2"}
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                  mr: 0.5, 
                }}
              >
                {url.shortUrl}
              </Typography>
              <CopyButton
                text={url.shortUrl}
                size={isMobile ? "small" : "medium"}
              />
              <Tooltip title="Open short URL in new tab">
                <IconButton
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size={isMobile ? "small" : "medium"}
                  sx={{ ml: 0.5 }}
                >
                  <OpenInNewIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              {isExpired && (
                <Chip
                  label="Expired"
                  color="error"
                  size="small"
                  sx={{ ml: 1, fontSize: isMobile ? "0.7rem" : "0.75rem" }}
                />
              )}
            </Box>
          </Box>

          {/* Right side: Stats and Actions - flex item */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "space-between", md: "flex-end" }, // Space between on xs, end on md
              mt: { xs: 1.5, md: 0 },
              width: { xs: "100%", md: "auto" }, // Full width on xs, auto on md
              gap: { xs: 1, sm: 1.5 }, // Gap between stats and action buttons
            }}
          >
            <URLStats url={url} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
                size={isMobile ? "small" : "medium"}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <IconButton
                onClick={handleDelete}
                color="error"
                size={isMobile ? "small" : "medium"}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              mt: 2,
              p: { xs: 1.5, sm: 2 },
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.100",
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Extend Expiration
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Column on xs, row on sm and up
                alignItems: { sm: "center" },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Box sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}>
                <TextField
                  fullWidth
                  label="Hours to extend"
                  type="number"
                  value={extensionHours}
                  onChange={(e) =>
                    setExtensionHours(parseInt(e.target.value) || 0)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                  }}
                  size="small"
                  sx={{ input: { fontSize: isMobile ? "0.9rem" : "1rem" } }} // Responsive input font size
                />
              </Box>
              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExtend}
                  disabled={extensionHours < 1 || isExpired} // Disable if expired
                  size={isMobile ? "small" : "medium"} // Responsive size
                  fullWidth
                  sx={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }} // Responsive font size
                >
                  Extend
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default URLListItem;
