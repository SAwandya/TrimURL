import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  InputAdornment, 
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useUrlStore } from '../store/urlStore';
import { CreateURLRequest } from '../types';

const URLForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [expiration, setExpiration] = useState<number>(24);
  const [urlError, setUrlError] = useState('');
  
  const { createUrl, loading, lastCreatedUrl } = useUrlStore();

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      setUrlError('');
      return true;
    } catch (err) {
      setUrlError('Please enter a valid URL including http:// or https://');
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
      expiresIn: expiration
    };
    
    await createUrl(data);
    setUrl('');
  };

  const handleExpirationChange = (e: SelectChangeEvent<number>) => {
    setExpiration(e.target.value as number);
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Shorten a URL
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={expiration}
                  onChange={handleExpirationChange}
                  displayEmpty
                  startAdornment={
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={1}>1 hour</MenuItem>
                  <MenuItem value={24}>24 hours</MenuItem>
                  <MenuItem value={72}>3 days</MenuItem>
                  <MenuItem value={168}>7 days</MenuItem>
                  <MenuItem value={720}>30 days</MenuItem>
                </Select>
                <FormHelperText>URL expiration time</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading || !url}
                sx={{ mt: { xs: 0, md: 2 }, height: 56 }}
              >
                {loading ? <CircularProgress size={24} /> : "Shorten URL"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {lastCreatedUrl && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Your shortened URL:
            </Typography>
            <Typography 
              component="a" 
              href={lastCreatedUrl.shortUrl} 
              target="_blank"
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                wordBreak: 'break-all',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {lastCreatedUrl.shortUrl}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default URLForm;