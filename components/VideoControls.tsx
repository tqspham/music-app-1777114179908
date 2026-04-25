"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import VideoProgressBar from "@/components/VideoProgressBar";
import VideoVolumeControl from "@/components/VideoVolumeControl";

export interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isBuffering: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onToggleFullscreen: () => void;
}

export default function VideoControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  isBuffering,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onToggleFullscreen,
}: VideoControlsProps): React.ReactElement {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 bg-gradient-to-t from-black to-transparent p-4 opacity-0 transition-opacity hover:opacity-100">
      {/* Progress Bar */}
      <VideoProgressBar
        currentTime={currentTime}
        duration={duration}
        bufferedTime={0}
        onSeek={onSeek}
        isDisabled={isBuffering}
      />

      {/* Control Buttons */}
      <div className="flex items-center justify-between">
        {/* Left controls: Play/Pause */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPlayPause}
            className="rounded p-2 transition-colors hover:bg-white/20 focus:outline-2 focus:outline-blue-500"
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={isBuffering}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* Right controls: Volume and Fullscreen */}
        <div className="flex items-center gap-2">
          <VideoVolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onMuteToggle={onMuteToggle}
          />

          <button
            onClick={onToggleFullscreen}
            className="rounded p-2 transition-colors hover:bg-white/20 focus:outline-2 focus:outline-blue-500"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? ("Minimize size={20} className="text-white" />
            ) : (
              <Maximize size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}