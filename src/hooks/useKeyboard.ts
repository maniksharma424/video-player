import { UseKeyboardShortcutsProps } from "@/types/types";
import { useEffect } from "react";

const useKeyBoard = ({
  videoContainer,
  volume,
  setVolume,
  videoElement,
  setPlayerState,
  playerState,
  seek,
  togglePlay,
  showsearchModal,
  setshowSearchModal,
  setShowVolumeRange,
  volumeTimeout,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const video = document.getElementById("videoPlayer");
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "F":
        case "f":
          !showsearchModal && videoContainer.current?.requestFullscreen();
          break;
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          setShowVolumeRange(true);
          const newVolume =
            event.key === "ArrowUp"
              ? Math.min(volume + 0.1, 1)
              : Math.max(volume - 0.1, 0);
          setVolume(newVolume);
          if (videoElement.current) {
            videoElement.current.volume = newVolume;
            if (volumeTimeout.current) {
              clearTimeout(volumeTimeout.current);
            }
            volumeTimeout.current = setTimeout(() => {
              setShowVolumeRange(false);
            }, 1000);
          }
          break;
        case "ArrowRight":
          event.preventDefault();
          seek(5);
          break;
        case "ArrowLeft":
          event.preventDefault();
          seek(-5);
          break;
        case " ":
          event.preventDefault();
          togglePlay();
          break;
        case "Escape":
          setshowSearchModal(false);
          break;
        default:
          if (
            (event.metaKey || event.ctrlKey) &&
            event.key === "k" &&
            document.fullscreenElement === video
          ) {
            setshowSearchModal(true);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    videoContainer,
    volume,
    setVolume,
    videoElement,
    setPlayerState,
    playerState,
    seek,
    togglePlay,
    setshowSearchModal,
  ]);
};

export default useKeyBoard;
