"use client";

import { useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  isDisabled: boolean;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
  isDisabled,
}: ProgressBarProps): React.ReactElement {
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

  return (
    <div className="space-y-2">
      <div
        ref={progressRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={isDisabled ? -1 : 0}
        aria-label="Seek bar"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-disabled={isDisabled}
        className={`group relative h-2 cursor-pointer rounded-full transition-colors ${
          isDisabled ? "bg-slate-700" : "bg-slate-600 hover:h-3"
        }`}
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-slate-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}