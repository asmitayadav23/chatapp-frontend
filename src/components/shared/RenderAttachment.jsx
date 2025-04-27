import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const RenderAttachment = (fileType, url) => {
  switch (fileType) {
    case "video":
      return (
        <Box sx={{ width: "100%", height: "auto" }}>
          <video src={url} preload="none" width="100%" height="auto" controls />
        </Box>
      );

    case "image":
      return (
        <Box sx={{ width: "200px", height: "150px", overflow: "hidden" }}>
          <img
            src={transformImage(url, 200)}
            alt="Attachment"
            width="100%"
            height="100%"
            style={{ objectFit: "contain", borderRadius: "8px" }}
          />
        </Box>
      );

    case "audio":
      return (
        <Box sx={{ width: "100%", height: "auto" }}>
          <audio src={url} preload="none" controls style={{ width: "100%" }} />
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem",
          }}
        >
          <FileOpenIcon />
          <Typography variant="body2" noWrap>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Open File
            </a>
          </Typography>
        </Box>
      );
  }
};

export default RenderAttachment;
