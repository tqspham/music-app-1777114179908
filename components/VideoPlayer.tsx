"use client";

import { useEffect, useRef, useState } from "react";
import VideoControls from "@/components/VideoControls";
import VideoBufferingIndicator from "@/components/VideoBufferingIndicator";
import VideoErrorDisplay from "@/components/VideoErrorDisplay";
import { twMerge } from "tailwind-merge";

export interface VideoSource {
  url: string;
  type: "video/mp4" | "video/webm" | "application/x-mpegURL";
}

export interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  sources: VideoSource[];
  posterImage: string;
  autoplay: boolean;
  muted: boolean;
  onError?: (message: string) => void;
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  sources,
  posterImage,
  autoplay,
  muted,
  onError,
}: VideoPlayerProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(muted);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bufferedTime, setBufferedTime] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = volume;
    if (autoplay && isPlaying) {
      video.play().catch(() => {
        setError("Failed to autoplay video");
      });
    }
  }, [autoplay, volume, isMuted, isPlaying]);

  // Handle play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        setError("Failed to play video");
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Update time display
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = (): void => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBufferedTime(video.buffered.end(video.buffered.length - 1));
      }
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateTime);
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }

    return (): void => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = (): void => {
      setDuration(video.duration);
    };

    const handleEnded = (): void => {
      setIsPlaying(false);
    };

    const handleError = (): void => {
      const errorMsg = "Failed to load video";
      setError(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    };

    const handlePlay = (): void => {
      setIsPlaying(true);
    };

    const handlePause = (): void => {
      setIsPlaying(false);
    };

    const handlePlaying = (): void => {
      setIsBuffering(false);
    };

    const handleWaiting = (): void => {
      setIsBuffering(true);
    };

    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("waiting", handleWaiting);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return (): void => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onError]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      const video = videoRef.current;
      if (!video) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "m":
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
        case "arrowright":
          e.preventDefault():
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case "arrowleft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "arrowup":
          e.preventDefault();
          setVolume(Math.min(volume + 0.1, 1));
          break;
        case "arrowdown":
          e.preventDefault();
          setVolume(Math.max(volume - 0.1, 0));
          break;
        case "f":
          e.preventDefault();
          handleToggleFullscreen();
          break;
        default:
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
    }

    return (): void => {
      if (container) {
        container.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isPlaying, isMuted, volume]);

  const handlePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number): void => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
    }
  };

  const handleVolumeChange = (vol: number): void => {
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const handleMuteToggle = (): void => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleToggleFullscreen = (): void => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {
        setError("Failed to enter fullscreen mode");
      });
    } else {
      document.exitFullscreen().catch(() => {
        setError("Failed to exit fullscreen mode");
      });
    }
  };

  const handleDismissError = (): void => {
    setError(null);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "space-y-4 rounded-lg bg-slate-900 p-6 focus-within:outline-none",
        isFullscreen && "fixed inset-0 z-50 flex flex-col items-center justify-center rounded-none p-0"
      )}
      tabIndex={0}
      role="region"
      aria-label="Video player"
    >
      {/* Video Title */}
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      {/* Video Container */}
      <div
        className={twMerge(
          "relative aspect-video w-full overflow-hidden rounded-lg bg-black",
          isFullscreen && "aspect-auto h-screen w-screen rounded-none"
        )}
      >
        <video
          ref={videoRef}
          className="h-full w-full"
          poster={posterImage}
          preload="metadata"
          controls={false}
          autoPlay={autoplay}
          muted={isMuted}
        >
          {sources.map((source, idx) => (
            <source key={`${videoId}-${idx}`} src={source.url} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </video>

        {/* Buffering Indicator */}
        <VideoBufferingIndicator isVisible={isBuffering} />

        {/* Error Display */}
        {error && (
          <VideoErrorDisplay
            error={error}
            onDismiss={handleDismissError}
          />
        )}

        {/* Custom Controls */}
        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          isBuffering={isBuffering}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

      {/* Video Description */}
      {description && (
        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-300">{description}</p>
        </div>
      )}
    </div>
  );
}