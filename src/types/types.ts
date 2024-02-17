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
  duration: string;
}
type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type VideoElementRef = React.MutableRefObject<HTMLVideoElement | null>;
export type VideoContainerRef = React.MutableRefObject<HTMLDivElement | null>;
export type PlaybackRef = React.MutableRefObject<HTMLDivElement | null>;

export type TogglePlayProps = {
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
};
export type Timeout = ReturnType<typeof setTimeout>;

export type ToggleFullscreenProps = {
  isFullscreenMode: boolean;
  videoContainer: VideoContainerRef;
  setIsFullscreenMode: SetStateBoolean;
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

export type videoCard = {
  id: string;
  description: string;
  sources: Array<string>;
  subtitle: string;
  thumb: string;
  title: string;
  duration: string;
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
  setIsFullscreenMode: SetStateBoolean;
  videoElement: VideoElementRef;
  videoContainer: VideoContainerRef;
  currentTime: number;
  duration: number;
  navigateToNextVideo: (id: string | undefined) => void;
  togglePlay: () => void;
  toggleFullscreen: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (playBackspeed: string) => void;
  toggleMute: () => void;
  seek: (seconds: number) => void;
  showVolumeRange: boolean;
  setShowVolumeRange: SetStateBoolean;
  showPlaybackSpeed: boolean;
  setShowPlaybackSpeed: SetStateBoolean;
  playbackRef: PlaybackRef;
  isVideoLoaded: boolean;
  setIsVideoLoaded: SetStateBoolean;
}

export type UseKeyboardShortcutsProps = {
  videoContainer: VideoContainerRef;
  volume: number;
  setVolume: (volume: number) => void;
  videoElement: VideoElementRef;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  playerState: PlayerState;
  seek: (seconds: number) => void;
  togglePlay: () => void;
};
