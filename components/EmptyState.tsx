"use client";

export default function EmptyState(): React.ReactElement {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-slate-400">
      <p className="text-lg font-medium">No songs available</p>
      <p className="text-sm">Add songs to your library to get started</p>
    </div>
  );
}