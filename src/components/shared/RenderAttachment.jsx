import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import PropTypes from "prop-types"; // For prop validation

const RenderAttachment = ({ file, url }) => { // 👈 Destructure props properly
  if (!url) return <FileOpenIcon />; // Handle missing URL

  const fileType = file?.type?.split("/")[0] || file?.split(".")?.pop()?.toLowerCase();

  switch (fileType) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

// Prop validation
RenderAttachment.propTypes = {
  file: PropTypes.oneOfType([
    PropTypes.string, // e.g., "image.png"
    PropTypes.shape({ type: PropTypes.string }), // e.g., { type: "image/png" }
  ]).isRequired,
  url: PropTypes.string.isRequired,
};

export default RenderAttachment;