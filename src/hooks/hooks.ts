import { useCallback, useEffect } from "react";
import {
  PlayerState,
  VideoElementRef,
  UsePlayPauseProps,
  UseFullscreenProps,
  UseVolumeControlProps,
  UseSeekingProps,
  UseKeyboardShortcutsProps,
  Video,
} from "../types/types";
import { seek, togglePlay } from "@/helpers/videoHelper";

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
export const useAutoPlay = (
  isPlaylistVideo: boolean | undefined,
  playerState: PlayerState,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>
) => {
  useEffect(() => {
    if (isPlaylistVideo) {
      setPlayerState({
        ...playerState,
        isPlaying: true,
      });
    }
  }, [isPlaylistVideo, playerState, setPlayerState]);
};

export const useSaveVideoProgress = (
  currentVideo: Video | null,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    const savedProgress = localStorage.getItem(currentVideo!.id);
    if (savedProgress && videoElement.current) {
      videoElement.current.currentTime = parseFloat(savedProgress);
    }
  }, [currentVideo, videoElement]);
};

export const useVideoEvents = (
  currentVideo: Video | null,
  videoElement: React.RefObject<HTMLVideoElement>
) => {
  const handleSaveProgress = useCallback(() => {
    if (videoElement.current) {
      localStorage.setItem(
        currentVideo!.id,
        videoElement.current.currentTime.toString()
      );
    }
  }, [currentVideo, videoElement]);

  useEffect(() => {
    const video = videoElement.current;

    if (video) {
      video.addEventListener("pause", handleSaveProgress);
      video.addEventListener("ended", handleSaveProgress);

      return () => {
        video.removeEventListener("pause", handleSaveProgress);
        video.removeEventListener("ended", handleSaveProgress);
      };
    }
  }, [currentVideo, videoElement, handleSaveProgress]);
};
