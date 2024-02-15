// "use client";

// import { PlayerState } from "@/types/types";
// import React, {
//   createContext,
//   useState,
//   ReactNode,
//   useContext,
//   useRef,
// } from "react";

// // export interface VideoContextType {
// //   allVideos: Video[];
// //   currentVideo: Video | null;
// //   updateCurrentVideo: (video: Video | null) => void;
// //   setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
// // }

// export const VideoPlayerContext = createContext(undefined);

// export const VideoPlayerProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [playerState, setPlayerState] = useState<PlayerState>({
//     isPlaying: false,
//     progress: 0,
//     speed: 1,
//     isMuted: false,
//   });
//   const [volume, setVolume] = useState(1);
//   const [isFullscreenMode, setIsFullscreenMode] = useState(false);
//   const videoElement = useRef<HTMLVideoElement>(null);
//   const videoContainer = useRef(null);
//   const contextValue = {
//     volume,
//     setVolume,
//     isFullscreenMode,
//     setIsFullscreenMode,
//     videoElement,
//     videoContainer,
//   };

//   return (
//     <VideoPlayerContext.Provider value={contextValue}>
//       {children}
//     </VideoPlayerContext.Provider>
//   );
// };

// export const useVideoPlayerContext = () => {
//   const context = useContext(VideoPlayerContext);
//   if (!context) {
//     throw new Error("useVideoContext must be used within a VideoProvider");
//   }
//   return context;
// };
