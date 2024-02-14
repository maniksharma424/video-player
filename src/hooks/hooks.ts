import { useEffect } from "react";
import {
  PlayerState,
  VideoElementRef,
  UsePlayPauseProps,
  UseFullscreenProps,
  UseVolumeControlProps,
  UseSeekingProps,
  UseKeyboardShortcutsProps,
} from "../types/index";
import { seek, togglePlay } from "@/helpers/videoPlayer";

export const usePlayPause = ({
  videoElement,
  playerState,
}: UsePlayPauseProps) => {
  useEffect(() => {
    if (videoElement.current) {
      playerState.isPlaying
        ? videoElement.current.play()
        : videoElement.current.pause();
    }
  }, [playerState.isPlaying, videoElement]);
};

export const useFullscreen = ({ videoContainer }: UseFullscreenProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F" || event.key === "f") {
        videoContainer.current?.requestFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [videoContainer]);
};

export const useVolumeControl = ({
  volume,
  setVolume,
  videoElement,
}: UseVolumeControlProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const newVolume =
          event.key === "ArrowUp"
            ? Math.min(volume + 0.1, 1)
            : Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        if (videoElement.current) {
          videoElement.current.volume = newVolume;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [volume, setVolume, videoElement]);
};

export const useSeeking = ({
  videoElement,
  setPlayerState,
  playerState,
}: UseSeekingProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        seek(5, videoElement, setPlayerState, playerState);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        seek(-5, videoElement, setPlayerState, playerState);
      } else if (event.key === "") {
        event.preventDefault();
        togglePlay(videoElement, setPlayerState, playerState);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoElement, playerState, setPlayerState]);
};

export const useKeyboardShortcuts = ({
  shortcuts,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (shortcuts[key]) {
        shortcuts[key]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};

export const useMuteToggle = (
  playerState: PlayerState,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.muted = playerState.isMuted;
    }
  }, [playerState.isMuted, videoElement]);
};
