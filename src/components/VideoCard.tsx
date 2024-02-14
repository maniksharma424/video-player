import React, { useContext, useState } from "react";
import { videoCard } from "@/types/types";
import Image from "next/image";
import { VideoContext, useVideoContext } from "@/providers/videoProvider";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VideoCard: React.FC<{ item: videoCard }> = ({ item }) => {
  const { description, sources, subtitle, thumb, title } = item;
  const { updateCurrentVideo } = useVideoContext();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/watch/${item.id}`)}
      className="w-full h-fit p-2 cursor-pointer"
      // onClick={() => updateCurrentVideo(item)}
    >
      <div className="w-full h-fit flex">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="image"
          className="w-1/2 h-24 border rounded-sm"
        >
          {isHovered ? (
            <VideoPlayer
              isPlaylistVideo
              showControls={false}
              currentVideo={item}
            />
          ) : (
            <Image src={item.thumb} height={10} width={200} alt="image" />
          )}
        </div>
        <div id="info" className="w-1/2">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
