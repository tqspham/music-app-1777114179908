import { NextResponse } from "next/server";

interface VideoSource {
  url: string;
  type: "video/mp4" | "video/webm" | "application/x-mpegURL";
}

interface Video {
  id: string;
  title: string;
  description: string;
  sources: VideoSource[];
  posterImage: string;
  autoplay: boolean;
  muted: boolean;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Beautiful Sunset",
    description: "A stunning time-lapse of the sun setting over the horizon, painting the sky in vibrant oranges and purples.",
    sources: [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.webm",
        type: "video/webm",
      },
    ],
    posterImage: "https://loremflickr.com/800/450/sunset",
    autoplay: false,
    muted: true,
  },
  {
    id: "2",
    title: "Ocean Waves",
    description: "Relaxing footage of gentle ocean waves crashing on a sandy beach. Perfect for meditation and relaxation.",
    sources: [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        type: "video/mp4",
      },
    ],
    posterImage: "https://loremflickr.com/800/450/ocean",
    autoplay: false,
    muted: true,
  },
  {
    id: "3",
    title: "Forest Walk",
    description: "A peaceful walk through a lush green forest with sounds of nature and wildlife all around you.",
    sources: [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        type: "video/mp4",
      },
    ],
    posterImage: "https://loremflickr.com/800/450/forest",
    autoplay: false,
    muted: true,
  },
  {
    id: "4",
    title: "Mountain Adventure",
    description: "Explore the majesty of snow-capped mountains and breathtaking alpine landscapes in this cinematic adventure.",
    sources: [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        type: "video/mp4",
      },
    ],
    posterImage: "https://loremflickr.com/800/450/mountains",
    autoplay: false,
    muted: true,
  },
];

export async function GET(): Promise<NextResponse<{ videos: Video[] }>> {
  // Simulate fetch delay to test loading state
  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json({ videos });
}