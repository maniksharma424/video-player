import React, { useState, useRef } from "react";
import { SetStateBoolean, Timeout, videoCard } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PreviewVideo from "./PreviewVideo";
import { GripHorizontal } from "lucide-react";
import { useVideoContext } from "@/providers/videoProvider";

const VideoCard: React.FC<{ item: videoCard }> = ({ item }) => {
  const { subtitle, title } = item;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();
  const timeoutRef = useRef<Timeout>();
  const { setShowPlayList }: { setShowPlayList: SetStateBoolean } =
    useVideoContext();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(`/watch/${item.id}`);
        setShowPlayList(false);
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
        className="w-2/6 h-[95px]  rounded-md relative"
      >
        {isHovered ? (
          <PreviewVideo video={item} />
        ) : (
          <>
            <Image
              className="w-full h-full rounded-md"
              src={item.thumb}
              height={50}
              width={50}
              alt="image"
            />
            <span className="absolute bottom-2 right-1 text-[9px] p-1  bg-black/60 text-white font-[500] rounded-sm ">
              {item.duration}
            </span>
          </>
        )}
      </div>
      <div id="info" className="w-1/2 ml-2 flex flex-col justify-start">
        <p className="text-[16px] font-[500] leading-8  w-full flex justify-between items-center">
          <span className="w-2/3 truncate font-[600]">{title}</span>
          <span>
            <GripHorizontal className="text-gray-500 cursor-move" />
          </span>
        </p>

        <p className="text-[12px] w-fit px-2 font-[600] leading-8  truncate bg-gray-100 text-gray-600 rounded-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
