export type PlayerState = {
  isPlaying: boolean;
  progress: number;
  speed: number;
  isMuted: boolean;
};
export interface Video {
  id: string;
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}

export type VideoElementRef = React.MutableRefObject<HTMLVideoElement | null>;
export type VideoContainerRef = React.MutableRefObject<HTMLDivElement | null>;

export type TogglePlayProps = {
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type ToggleFullscreenProps = {
  isFullscreenMode: boolean;
  videoContainer: VideoContainerRef;
  setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HandleVolumeChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  videoElement: VideoElementRef;
};

export type FormatTimeProps = {
  timeInSeconds: number;
};

export type HandleOnTimeUpdateProps = {
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type HandleVideoProgressProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type HandleVideoSpeedProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type ToggleMuteProps = {
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type SeekProps = {
  seconds: number;
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};

export type UsePlayPauseProps = {
  videoElement: VideoElementRef;
  playerState: PlayerState;
};

export type UseFullscreenProps = {
  videoContainer: VideoContainerRef;
};

export type UseVolumeControlProps = {
  volume: number;
  setVolume: (volume: number) => void;
  videoElement: VideoElementRef;
};
export type UseSeekingProps = {
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
  seek: (seconds: number) => void;
  togglePlay: () => void;
};

export type UseKeyboardShortcutsProps = {
  shortcuts: { [key: string]: () => void };
};

export type videoCard = {
  id: string;
  description: string;
  sources: Array<string>;
  subtitle: string;
  thumb: string;
  title: string;
};

export interface VideoPlayerProps {
  currentVideo: Video | null;
  showControls?: boolean;
  isPlaylistVideo?: boolean | undefined;
}
export interface VideoPlayerContextType {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isFullscreenMode: boolean;
  setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>;
  videoElement: VideoElementRef;
  videoContainer: VideoContainerRef;
  currentTime: number;
  duration: number;
  navigateToNextVideo: () => void;
  togglePlay: () => void;
  toggleFullscreen: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (playBackspeed: string) => void;
  toggleMute: () => void;
  seek: (seconds: number) => void;
}
