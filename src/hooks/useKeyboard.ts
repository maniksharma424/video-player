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
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "F":
        case "f":
          videoContainer.current?.requestFullscreen();
          break;
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          const newVolume =
            event.key === "ArrowUp"
              ? Math.min(volume + 0.1, 1)
              : Math.max(volume - 0.1, 0);
          setVolume(newVolume);
          if (videoElement.current) {
            videoElement.current.volume = newVolume;
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
        default:
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
  ]);
};

export default useKeyBoard;
