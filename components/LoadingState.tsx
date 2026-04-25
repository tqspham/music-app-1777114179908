"use client";

export default function LoadingState(): React.ReactElement {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-slate-300">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
      <p>Loading songs...</p>
    </div>
  );
}