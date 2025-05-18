import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
      <IconButton onClick={handleCopy} size="small">
        {copied ? <DoneIcon color="success" /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
