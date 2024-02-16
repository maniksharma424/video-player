import React, { useContext, useState, useRef } from "react";
import { Timeout, videoCard } from "@/types/types";
import Image from "next/image";
import { VideoContext, useVideoContext } from "@/providers/videoProvider";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PreviewVideo from "./PreviewVideo";

const VideoCard: React.FC<{ item: videoCard }> = ({ item }) => {
  const { description, sources, subtitle, thumb, title } = item;

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<Timeout>(); 

  return (
    <div
      onClick={(e) => {

        
        e.preventDefault();
        router.push(`/watch/${item.id}`);
      }}
      className="w-full h-full  cursor-pointer flex items-start"
    >
      <div
        onMouseEnter={() => {
          timeoutRef.current = setTimeout(() => {
            setIsHovered(true);
          }, 600);
        }}
        onMouseLeave={() => {
          clearTimeout(timeoutRef.current); 
          setIsHovered(false);
        }}
        id="image"
        className="w-2/5 h-[95px] border rounded-md"
      >
        {isHovered ? (
          // <VideoPlayer
          //   isPlaylistVideo
          //   showControls={false}
          //   currentVideo={item}
          // />
          <PreviewVideo  video={item}/>
        ) : (
          <Image
            className="w-full h-full rounded-md object-cover "
            src={item.thumb}
            height={5}
            width={100}
            alt="image"
          />
        )}
      </div>
      <div id="info" className="w-1/2 ml-2 flex flex-col justify-start">
        <p className="text-[16px] font-[500] leading-8 truncate">{title}</p>

        <p className="text-[12px] font-[600] leading-8 text-gray-400 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
