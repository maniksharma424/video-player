import VideoCard from "@/components/VideoCard";
import { useVideoContext } from "@/providers/videoProvider";
import { Video } from "@/types/types";
import React, { useRef } from "react";
import LoadingContainer from "./LoadingContainer";

const Page: React.FC<{ currentVideoId: string }> = ({ currentVideoId }) => {
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
    <div className="h-full w-full flex  flex-col justify-start  ">
      <LoadingContainer loading={loading}>
        {allVideos.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`my-2 ${currentVideoId === item.id && "hidden"}`}
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
  );
};

export default Page;
