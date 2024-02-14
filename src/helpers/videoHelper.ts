import { PlayerState, VideoElementRef, VideoContainerRef } from '../types/types'; 

export const togglePlay = (
  videoElement: VideoElementRef,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
  playerState: PlayerState
): void => {
  if (videoElement.current) {
    if (videoElement.current.paused || videoElement.current.ended) {
      videoElement.current.play();
    } else {
      videoElement.current.pause();
    }
    setPlayerState({
      ...playerState,
      isPlaying: !videoElement.current.paused,
    });
  }
};

export const toggleFullscreen = (
  isFullscreenMode: boolean,
  videoContainer: VideoContainerRef,
  setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (!isFullscreenMode) {
    videoContainer.current?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  setIsFullscreenMode(!isFullscreenMode);
};

export const handleVolumeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setVolume: React.Dispatch<React.SetStateAction<number>>,
  videoElement: VideoElementRef
): void => {
  const newVolume = parseFloat(event.target.value);
  setVolume(newVolume);
  if (videoElement.current) {
    videoElement.current.volume = newVolume;
  }
};

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${String(minutes).padStart(2, '0')}:${formattedSeconds}`;
};

export const handleOnTimeUpdate = (
  videoElement: VideoElementRef,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
  playerState: PlayerState
): void => {
  if (videoElement.current) {
    const progress =
      (videoElement?.current?.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  }
};

export const handleVideoProgress = (
    event: React.ChangeEvent<HTMLInputElement>,
    videoElement: VideoElementRef,
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
    playerState: PlayerState
  ): void => {
    const manualChange = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    }
  };
  

  export const handleVideoSpeed = (
    playBackspeed: string,
    videoElement: VideoElementRef,
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
    playerState: PlayerState
  ): void => {
    const speed = Number(playBackspeed);
    if (videoElement.current) {
      videoElement.current.playbackRate = speed;
      setPlayerState({
        ...playerState,
        speed,
      });
    }
  };
  

export const toggleMute = (
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
  playerState: PlayerState
): void => {
  setPlayerState({
    ...playerState,
    isMuted: !playerState.isMuted,
  });
};

export const seek = (
  seconds: number,
  videoElement: VideoElementRef,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
  playerState: PlayerState
): void => {
  if (videoElement.current) {
    const newTime = videoElement.current.currentTime + seconds;
    videoElement.current.currentTime = Math.max(
      0,
      Math.min(newTime, videoElement.current.duration)
    );
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  }
};
