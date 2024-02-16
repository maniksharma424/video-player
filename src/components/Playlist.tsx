import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { useVideoContext } from "@/providers/videoProvider";
import { Video } from "@/types/types";
import { Grip } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LoadingContainer from "./LoadingContainer";

const Page: React.FC<{ videoId: string }> = ({ videoId }) => {
  const {
    allVideos,
    setAllVideos,
    loading,
  }: {
    allVideos: Video[];
    setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
    loading: boolean;
  } = useVideoContext();

  const dragItem = useRef<number>(0);

  const draggedOverItem = useRef<number>(0);

  const dragStart = (index: number, e: any) => {
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = "0.01";
    if (dragItem.current) {
      dragItem.current = index;
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    const draggedElementIndex = dragItem.current;
    const draggedOverElementIndex = draggedOverItem.current;

    if (draggedElementIndex !== draggedOverElementIndex) {
      const updatedVideos = [...allVideos];
      const [draggedElement] = updatedVideos.splice(draggedElementIndex, 1);
      updatedVideos.splice(draggedOverElementIndex, 0, draggedElement);
      setAllVideos(updatedVideos);
      dragItem.current = draggedOverElementIndex;
    }
  };

  const handleDragEnd = async (e: any) => {
    e.target.style.opacity = "1";

    const videoOrder = allVideos.map((video) => video.id);

    localStorage.setItem("videoOrder", JSON.stringify(videoOrder));
  };

  return (
    <div className="w-full h-screen flex flex-col sm:pl-10">
      <div className="flex-1 w-full flex  flex-col justify-start ">
        <LoadingContainer loading={loading}>
          {allVideos.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`my-2 ${videoId === item.id && "bg-gray-200"}`}
              >
                <div
                  draggable
                  onDragStart={(e) => {
                    dragStart(index, e);
                  }}
                  onDragEnter={() => (draggedOverItem.current = index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  className="flex items-center  rounded-lg max-h-32"
                >
                  <VideoCard item={item} />
                </div>
              </div>
            );
          })}
        </LoadingContainer>
      </div>
    </div>
  );
};

export default Page;
