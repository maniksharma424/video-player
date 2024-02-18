import { Video } from "@/types/types";
import React, { useEffect, useRef } from "react";

const PreviewVideo: React.FC<{ video: Video }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  return (
    <video
      ref={videoRef}
      className="w-full h-full rounded-md"
      src={video.sources[0]}
      muted
    ></video>
  );
};

export default PreviewVideo;
