"use client";

import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  error: string | null;
  onDismiss: () => void;
}

export default function ErrorBoundary({
  error,
  onDismiss,
}: ErrorBoundaryProps): React.ReactElement | null {
  if (!error) {
    return null;
  }

  return (
    <div className="border-b border-red-700 bg-red-900 px-6 py-4">
      <div className="flex items-start gap-4">
        <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="font-medium text-red-100">Error</p>
          <p className="text-sm text-red-200">{error}</p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-200 transition-colors hover:text-red-100"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      </div>
    </div>
  );
}