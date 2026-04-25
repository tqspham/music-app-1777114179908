"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage(): React.ReactElement {
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
        <h1 className="mb-8 text-4xl font-bold">Settings</h1>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <Lock size={24} className="text-blue-400" />
              <h2 className="text-2xl font-bold">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-700 p-4">
                <div>
                  <p className="font-medium text-white">Private Profile</p>
                  <p className="text-sm text-slate-400">Make your profile private</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-600 text-blue-600"
                  aria-label="Toggle private profile"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-700 p-4">
                <div>
                  <p className="font-medium text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-400">Enable 2FA for added security</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-600 text-blue-600"
                  aria-label="Toggle two-factor authentication"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <Bell size={24} className="text-blue-400" />
              <h2 className="text-2xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-700 p-4">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-slate-400">Receive email updates</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-600 text-blue-600"
                  defaultChecked
                  aria-label="Toggle email notifications"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-700 p-4">
                <div>
                  <p className="font-medium text-white">Push Notifications</p>
                  <p className="text-sm text-slate-400">Receive push notifications</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-600 text-blue-600"
                  defaultChecked
                  aria-label="Toggle push notifications"
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <Palette size={24} className="text-blue-400" />
              <h2 className="text-2xl font-bold">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-700 p-4">
                <label className="mb-2 block font-medium text-white">
                  Theme
                </label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-white transition-colors hover:border-slate-500 focus:outline-2 focus:outline-blue-500"
                  aria-label="Select theme"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="rounded-lg bg-slate-700 p-4">
                <label className="mb-2 block font-medium text-white">
                  Font Size
                </label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-white transition-colors hover:border-slate-500 focus:outline-2 focus:outline-blue-500"
                  aria-label="Select font size"
                >
                  <option value="small">Small</option>
                  <option value="medium" selected>
                    Medium
                  </option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}