"use client";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  canPlay: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PlayerControls({
  isPlaying,
  canPlay,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}: PlayerControlsProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onPrevious}
        className="rounded-full p-3 transition-colors hover:bg-slate-700 active:bg-slate-600"
        aria-label="Previous song"
      >
        <SkipBack size={28} />
      </button>

      {isPlaying ? (
        <button
          onClick={onPause}
          disabled={!canPlay}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Pause"
        >
          <Pause size={32} />
        </button>
      ) : (
        <button
          onClick={onPlay}
          disabled={!canPlay}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Play"
        >
          <Play size={32} className="ml-1" />
        </button>
      )}

      <button
        onClick={onNext}
        className="rounded-full p-3 transition-colors hover:bg-slate-700 active:bg-slate-600"
        aria-label="Next song"
      >
        <SkipForward size={28} />
      </button>
    </div>
  );
}