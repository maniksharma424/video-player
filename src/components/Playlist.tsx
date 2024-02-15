import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { useVideoContext } from "@/providers/videoProvider";
import { Video } from "@/types/types";
import { Grip } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LoadingContainer from "./LoadingContainer";

const Page = () => {
  const [loading, setIsLoading] = useState(true);
  const {
    allVideos,
    setAllVideos,
  }: {
    allVideos: Video[];
    setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
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

  useEffect(() => {
    const getSavedVideoOrder = () => {
      const savedOrder = localStorage.getItem("videoOrder");
      return savedOrder ? JSON.parse(savedOrder) : null;
    };

    const savedVideoOrder = getSavedVideoOrder();

    if (savedVideoOrder) {
      const reorderedVideos = savedVideoOrder.map((id:string) =>
        allVideos.find((video) => video.id === id)
      );
      setAllVideos(reorderedVideos);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <div className="flex-1 w-full flex  flex-col justify-start ">
        <LoadingContainer loading={loading}>
          {allVideos.map((item, index) => {
            return (
              <div key={item.id}>
                <div
                  draggable
                  onDragStart={(e) => {
                    dragStart(index, e);
                  }}
                  onDragEnter={() => (draggedOverItem.current = index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  className="flex items-center p-4 border border-gray-200 rounded-lg"
                >
                  <div className="cursor-move mr-2">
                    <Grip />
                  </div>

                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
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
