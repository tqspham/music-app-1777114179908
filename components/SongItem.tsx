"use client";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

interface SongItemProps {
  song: Song;
  isSelected: boolean;
  onClick: () => void;
}

export default function SongItem({
  song,
  isSelected,
  onClick,
}: SongItemProps): React.ReactElement {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg p-3 text-left transition-colors ${
        isSelected
          ? "bg-blue-600 text-white"
          : "bg-slate-700 text-slate-100 hover:bg-slate-600"
      }`}
      aria-selected={isSelected}
      aria-label={`${song.title} by ${song.artist}`}
    >
      <div className="truncate font-medium">{song.title}</div>
      <div className="text-sm text-slate-300">{song.artist}</div>
      <div className="text-xs text-slate-400">
        {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}
      </div>
    </button>
  );
}