import { NextResponse } from "next/server";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

const songs: Song[] = [
  {
    id: "1",
    title: "Midnight Dream",
    artist: "Luna Echo",
    duration: 245,
    albumArt: "https://loremflickr.com/300/300/music",
  },
  {
    id: "2",
    title: "Electric Pulse",
    artist: "Neon Lights",
    duration: 198,
    albumArt: "https://loremflickr.com/300/300/electronic",
  },
  {
    id: "3",
    title: "Ocean Waves",
    artist: "Coastal Vibes",
    duration: 287,
    albumArt: "https://loremflickr.com/300/300/ocean",
  },
  {
    id: "4",
    title: "Sunset Boulevard",
    artist: "Golden Hour",
    duration: 234,
    albumArt: "https://loremflickr.com/300/300/sunset",
  },
  {
    id: "5",
    title: "Urban Groove",
    artist: "City Beats",
    duration: 256,
    albumArt: "https://loremflickr.com/300/300/urban",
  },
  {
    id: "6",
    title: "Ethereal Journey",
    artist: "Sky Wanderer",
    duration: 312,
    albumArt: "https://loremflickr.com/300/300/sky",
  },
  {
    id: "7",
    title: "Rhythmic Soul",
    artist: "Beat Keeper",
    duration: 268,
    albumArt: "https://loremflickr.com/300/300/rhythm",
  },
  {
    id: "8",
    title: "Starlight Serenade",
    artist: "Cosmic Echo",
    duration: 289,
    albumArt: "https://loremflickr.com/300/300/stars",
  },
  {
    id: "9",
    title: "Forest Whispers",
    artist: "Nature Sound",
    duration: 276,
    albumArt: "https://loremflickr.com/300/300/forest",
  },
  {
    id: "10",
    title: "Aurora Borealis",
    artist: "Northern Lights",
    duration: 301,
    albumArt: "https://loremflickr.com/300/300/aurora",
  },
  {
    id: "11",
    title: "Desert Mirage",
    artist: "Sand Dunes",
    duration: 243,
    albumArt: "https://loremflickr.com/300/300/desert",
  },
  {
    id: "12",
    title: "Mountain Echo",
    artist: "Peak Sound",
    duration: 267,
    albumArt: "https://loremflickr.com/300/300/mountains",
  },
];

export async function GET(): Promise<NextResponse<{ songs: Song[] }>> {
  // Simulate fetch delay to test loading state
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({ songs });
}