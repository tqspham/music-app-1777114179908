"use client";

export interface VideoBufferingIndicatorProps {
  isVisible: boolean;
}

export default function VideoBufferingIndicator({
  isVisible,
}: VideoBufferingIndicatorProps): React.ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/40"
      role="status"
      aria-live="polite"
      aria-label="Video is loading"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500" />
    </div>
  );
}