import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  Collapse,
  TextField,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
    <Card sx={{ mb: 2, opacity: isExpired ? 0.7 : 1 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Original URL */}
          <Grid item xs={12} sm={7}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {url.originalUrl}
            </Typography>

            {/* Short URL with copy button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="a"
                href={url.shortUrl}
                target="_blank"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {url.shortUrl}
              </Typography>
              <CopyButton text={url.shortUrl} />
            </Box>
          </Grid>

          {/* Stats and actions */}
          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <URLStats url={url} />

              <Box sx={{ display: "flex" }}>
                <IconButton
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                  aria-label="show more"
                  size="small"
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton onClick={handleDelete} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Extend expiration section */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Extend Expiration
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8} sm={6}>
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
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExtend}
                  disabled={extensionHours < 1}
                  size="medium"
                  fullWidth
                >
                  Extend
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default URLListItem;
