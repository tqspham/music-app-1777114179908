"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, User } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function ProfilePage(): React.ReactElement {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json() as { user: UserData };
        setUser(data.user);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-20">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-blue-400"
        >
          <ArrowLeft size={20} />
          <span>Back to Media Player</span>
        </Link>

        {/* Page Title */}
        <h1 className="mb-8 text-4xl font-bold">User Profile</h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center rounded-lg bg-slate-800 p-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-lg border border-red-700 bg-red-900 p-6 text-red-100">
            <p className="font-medium">Error loading profile</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Content */}
        {user && !isLoading && (
          <div className="rounded-lg bg-slate-800 p-8 shadow-lg">
            {/* Avatar */}
            <div className="mb-8 flex justify-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-32 w-32 rounded-full border-4 border-blue-600 object-cover"
              />
            </div>

            {/* User Info */}
            <div className="space-y-6">
              {/* Name */}
              <div className="rounded-lg bg-slate-700 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <User size={20} className="text-blue-400" />
                  <label className="text-sm font-semibold text-slate-300">Name</label>
                </div>
                <p className="text-lg text-white">{user.name}</p>
              </div>

              {/* Email */}
              <div className="rounded-lg bg-slate-700 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Mail size={20} className="text-blue-400" />
                  <label className="text-sm font-semibold text-slate-300">Email</label>
                </div>
                <p className="text-lg text-white">{user.email}</p>
              </div>

              {/* User ID */}
              <div className="rounded-lg bg-slate-700 p-4">
                <label className="text-sm font-semibold text-slate-300">User ID</label>
                <p className="mt-2 font-mono text-sm text-slate-300">{user.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}