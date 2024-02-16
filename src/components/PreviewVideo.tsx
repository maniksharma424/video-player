import { Video } from "@/types/types";
import React from "react";

const PreviewVideo: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <video
      className="w-full h-full"
      src={video.sources[0]}
      autoPlay
      muted
    ></video>
  );
};

export default PreviewVideo;
