import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { useUrlStore } from "../store/urlStore";
import type { CreateURLRequest } from "../types";
import { TIME_OPTIONS, TIME_CONSTANTS } from "../constants/time";

interface URLFormProps {
  open: boolean;
  onClose: () => void;
}

const URLForm: React.FC<URLFormProps> = ({ open, onClose }) => {
  const [url, setUrl] = useState("");
  const [expiration, setExpiration] = useState<number>(TIME_CONSTANTS.ONE_DAY);
  const [urlError, setUrlError] = useState("");

  const { createUrl, loading, success, resetSuccess } = useUrlStore(); // Added success and resetSuccess

  useEffect(() => {
    if (success) {
      onClose();
      resetSuccess();
    }
  }, [success, onClose, resetSuccess]);

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      setUrlError("");
      return true;
    } catch (err) {
      setUrlError("Please enter a valid URL including http:// or https://");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      return;
    }

    const data: CreateURLRequest = {
      originalUrl: url,
      expiresIn: expiration,
    };

    await createUrl(data);
  };

  const handleExpirationChange = (e: SelectChangeEvent<number>) => {
    setExpiration(e.target.value as number);
  };

  useEffect(() => {
    if (open) {
      setUrl("");
      setExpiration(TIME_CONSTANTS.ONE_DAY);
      setUrlError("");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="shorten-url-modal-title"
      aria-describedby="shorten-url-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "500px",
          borderRadius: 2,
          position: "relative",
          outline: "none",
        }} // Adjusted maxWidth slightly
      >
        <IconButton
          aria-label="close modal"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          id="shorten-url-modal-title"
        >
          Shorten a URL
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="url"
            label="Enter a long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            error={!!urlError}
            helperText={urlError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <Select
              value={expiration}
              onChange={handleExpirationChange}
              displayEmpty
              startAdornment={
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              }
              inputProps={{ "aria-label": "Expiration Time" }}
            >
              {TIME_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Set expiration time</FormHelperText>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            {" "}
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              sx={{ mr: 2, py: 1.25, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ py: 1.25, px: 3 }} // Adjusted padding
            >
              {loading ? <CircularProgress size={24} /> : "Shorten URL"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default URLForm;
