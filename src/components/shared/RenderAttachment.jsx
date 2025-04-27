import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const RenderAttachment = (fileType, url) => {
  if (fileType === "image") {
    // 🖼️ Directly render the image with click to open full size
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </a>
    );
  }

  if (fileType === "video") {
    return (
      <video
        src={url}
        width="200px"
        height="150px"
        style={{ borderRadius: "8px", objectFit: "cover" }}
        controls
      />
    );
  }

  if (fileType === "audio") {
    return (
      <audio
        src={url}
        style={{ width: "200px" }}
        controls
      />
    );
  }

  // For other files like PDFs, Docs etc.
  return (
    <Box>
      <a href={url} target="_blank" rel="noopener noreferrer" download style={{ textDecoration: "none", color: "inherit" }}>
        <FileOpenIcon />
        <Typography variant="body2" component="span" ml={1}>
          Open File
        </Typography>
      </a>
    </Box>
  );
};

export default RenderAttachment;
