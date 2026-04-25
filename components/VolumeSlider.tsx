"use client";

import { Volume2, Volume1, VolumeX } from "lucide-react";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeSlider({
  volume,
  onVolumeChange,
}: VolumeSliderProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
  if (volume === 0) {
    VolumeIcon = VolumeX;
  } else if (volume < 0.5) {
    VolumeIcon = Volume1;
  }

  return (
    <div className="flex items-center gap-4">
      <VolumeIcon size={24} className="flex-shrink-0" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Volume control"
        className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-600 outline-none"
        style={{
          background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${volume * 100}%, rgb(71, 85, 105) ${volume * 100}%, rgb(71, 85, 105) 100%)`,
        }}
      />
      <span className="text-sm text-slate-400" aria-live="polite" aria-atomic="true">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
}