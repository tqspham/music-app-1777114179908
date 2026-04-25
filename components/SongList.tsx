"use client";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

interface SongListProps {
  songs: Song[];
  selectedId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
  isEmpty: boolean;
}

import SongItem from "@/components/SongItem";

export default function SongList({
  songs,
  selectedId,
  onSelect,
  isLoading,
  isEmpty,
}: SongListProps): React.ReactElement {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-800 p-4">
      <h2 className="mb-4 text-xl font-bold text-white">Playlist</h2>
      <div className="flex-1 overflow-y-auto">
        {!isLoading && !isEmpty && songs.length > 0 && (
          <div className="space-y-2">
            {songs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                isSelected={selectedId === song.id}
                onClick={() => onSelect(song.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}