"use client";

import { useEffect, useRef, useState } from "react";
import SongList from "@/components/SongList";
import NowPlaying from "@/components/NowPlaying";
import PlayerControls from "@/components/PlayerControls";
import ProgressBar from "@/components/ProgressBar";
import VolumeSlider from "@/components/VolumeSlider";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorBoundary from "@/components/ErrorBoundary";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt?: string;
}

interface PlayerState {
  currentSongId: string | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
}

type AudioReference = HTMLAudioElement | null;

export default function Page(): React.ReactElement {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSongId: null,
    isPlaying: false,
    currentTime: 0,
    volume: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<AudioReference>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Fetch songs on mount
  useEffect(() => {
    const fetchSongs = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/songs");
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json() as { songs: Song[] };
        setSongs(data.songs);
        setIsEmpty(data.songs.length === 0);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSongs();
  }, []);

  // Initialize audio element and handle playback
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = playerState.volume;
    }

    const audio = audioRef.current;
    const currentSong = songs.find((s) => s.id === playerState.currentSongId);

    if (!currentSong) {
      audio.pause();
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
      return;
    }

    audio.src = `data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=`;
    audio.volume = playerState.volume;

    const handleEnded = (): void => {
      handleNext();
    };

    const handleError = (): void => {
      setError("Playback error: unable to play song");
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    };

    const updateTime = (): void => {
      setPlayerState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    if (playerState.isPlaying) {
      audio.play().catch(() => {
        setError("Playback error: unable to play song");
      });
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      audio.pause();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return (): void => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playerState.currentSongId, playerState.isPlaying, songs, playerState.volume]);

  const handleSelectSong = (songId: string): void => {
    const song = songs.find((s) => s.id === songId);
    if (!song) return;

    setPlayerState((prev) => ({
      ...prev,
      currentSongId: songId,
      isPlaying: true,
      currentTime: 0,
    }));
  };

  const handlePlay = (): void => {
    if (!playerState.currentSongId) return;
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  };

  const handlePause = (): void => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }));
  };

  const handleNext = (): void => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(
      (s) => s.id === playerState.currentSongId
    );
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSelectSong(songs[nextIndex].id);
  };

  const handlePrevious = (): void => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(
      (s) => s.id === playerState.currentSongId
    );
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    handleSelectSong(songs[prevIndex].id);
  };

  const handleSeek = (time: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (volume: number): void => {
    setPlayerState((prev) => ({ ...prev, volume }));
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const currentSong = songs.find((s) => s.id === playerState.currentSongId) || null;

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <ErrorBoundary
        error={error}
        onDismiss={() => setError(null)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main player section */}
        <div className="flex flex-1 flex-col p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Music Player</h1>
          </div>

          {/* Now Playing */}
          <div className="mb-12 flex-shrink-0">
            <NowPlaying song={currentSong} />
          </div>

          {/* Progress Bar */}
          <div className="mb-8 flex-shrink-0">
            {currentSong && (
              <ProgressBar
                currentTime={playerState.currentTime}
                duration={currentSong.duration}
                onSeek={handleSeek}
                isDisabled={!currentSong}
              />
            )}
          </div>

          {/* Player Controls */}
          <div className="mb-8 flex-shrink-0">
            <PlayerControls
              isPlaying={playerState.isPlaying}
              canPlay={!!currentSong}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>

          {/* Volume Slider */}
          <div className="flex-shrink-0">
            <VolumeSlider
              volume={playerState.volume}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>

        {/* Song List */}
        <div className="w-80 border-l border-slate-700 bg-slate-800">
          {isLoading ? (
            <LoadingState />
          ) : isEmpty ? (
            <EmptyState />
          ) : (
            <SongList
              songs={songs}
              selectedId={playerState.currentSongId || ""}
              onSelect={handleSelectSong}
              isLoading={isLoading}
              isEmpty={isEmpty}
            />
          )}
        </div>
      </div>
    </div>
  );
}