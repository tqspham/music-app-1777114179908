"use client";

import { useRef } from "react";

export interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  bufferedTime: number;
  onSeek: (time: number) => void;
  isDisabled: boolean;
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};

export default function VideoProgressBar({
  currentTime,
  duration,
  bufferedTime,
  onSeek,
  isDisabled,
}: VideoProgressBarProps): React.ReactElement {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isDisabled || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(percent * duration, duration));
    onSeek(newTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled) return;

    const step = 5; // 5 seconds
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onSeek(Math.min(currentTime + step, duration));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onSeek(Math.max(currentTime - step, 0));
    }
  };

  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedTime / duration) * 100 : 0;

  return (
    <div className="space-y-2">
      <div
        ref={progressRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={isDisabled ? -1 : 0}
        aria-label="Video seek bar"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(currentTime)}
        aria-disabled={isDisabled}
        className={`group relative h-1 cursor-pointer rounded-full transition-all ${
          isDisabled ? "bg-slate-700" : "bg-slate-600 hover:h-2"
        }`}
      >
        {/* Buffered progress */}
        <div
          className="absolute h-full rounded-full bg-slate-500 transition-all"
          style={{ width: `${bufferedPercent}%` }}
        />
        {/* Current progress */}
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}