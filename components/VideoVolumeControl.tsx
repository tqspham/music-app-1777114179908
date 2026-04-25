"use client";

import { Volume2, Volume1, VolumeX } from "lucide-react";

export interface VideoVolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

export default function VideoVolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VideoVolumeControlProps): React.ReactElement {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onVolumeChange(parseFloat(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const step = 0.1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onVolumeChange(Math.min(volume + step, 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onVolumeChange(Math.max(volume - step, 0));
    }
  };

  let VolumeIcon = Volume2;
  if (isMuted || volume === 0) {
    VolumeIcon = VolumeX;
  } else if (volume < 0.5) {
    VolumeIcon = Volume1;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMuteToggle}
        className="rounded p-2 transition-colors hover:bg-white/20 focus:outline-2 focus:outline-blue-500"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <VolumeIcon size={18} className="text-white" />
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        onKeyDown={handleKeyDown}
        aria-label="Volume control"
        className="h-1 w-12 cursor-pointer appearance-none rounded-full bg-slate-600 outline-none"
        style={{
          background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(isMuted ? 0 : volume) * 100}%, rgb(71, 85, 105) ${(isMuted ? 0 : volume) * 100}%, rgb(71, 85, 105) 100%)`,
        }}
      />
    </div>
  );
}