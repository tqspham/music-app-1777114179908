"use client";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

interface NowPlayingProps {
  song: Song | null;
}

export default function NowPlaying({ song }: NowPlayingProps): React.ReactElement {
  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-800 p-12">
        <div className="mb-4 h-48 w-48 rounded-lg bg-slate-700"></div>
        <p className="text-xl font-light text-slate-400">No song selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 overflow-hidden rounded-lg bg-slate-700 shadow-lg">
        <img
          src={song.albumArt || "https://loremflickr.com/300/300/music"}
          alt={`${song.title} by ${song.artist}`}
          className="h-48 w-48 object-cover"
        />
      </div>
      <h2 className="mb-2 text-center text-3xl font-bold">{song.title}</h2>
      <p className="text-center text-lg text-slate-300">{song.artist}</p>
    </div>
  );
}