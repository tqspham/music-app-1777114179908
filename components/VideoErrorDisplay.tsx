"use client";

import { AlertCircle } from "lucide-react";

export interface VideoErrorDisplayProps {
  error: string;
  onDismiss: () => void;
}

export default function VideoErrorDisplay({
  error,
  onDismiss,
}: VideoErrorDisplayProps): React.ReactElement {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/60"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-900 p-6 text-center">
        <AlertCircle size={32} className="text-red-500" />
        <div>
          <p className="font-semibold text-white">Unable to Play Video</p>
          <p className="mt-2 text-sm text-slate-300">{error}</p>
        </div>
        <button
          onClick={onDismiss}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-2 focus:outline-blue-400"
          aria-label="Dismiss error message"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}