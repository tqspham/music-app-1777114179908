"use client";

import Link from "next/link";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
  onLogout,
}: ProfileDropdownProps): React.ReactElement | null {
  if (!isOpen) {
    return null;
  }

  const handleLogoutClick = (): void => {
    onLogout();
    onClose();
  };

  return (
    <div
      className={twMerge(
        "absolute right-0 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-800 shadow-xl transition-opacity duration-150",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="profile-button"
    >
      {/* Profile Link */}
      <Link
        href="/profile"
        onClick={onClose}
        className="flex items-center gap-3 border-b border-slate-700 px-4 py-3 transition-colors hover:bg-slate-700"
        role="menuitem"
      >
        <UserIcon size={18} className="text-slate-300" />
        <span className="text-sm font-medium text-slate-100">Profile</span>
      </Link>

      {/* Settings Link */}
      <Link
        href="/settings"
        onClick={onClose}
        className="flex items-center gap-3 border-b border-slate-700 px-4 py-3 transition-colors hover:bg-slate-700"
        role="menuitem"
      >
        <Settings size={18} className="text-slate-300" />
        <span className="text-sm font-medium text-slate-100">Settings</span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogoutClick}
        className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-700"
        role="menuitem"
      >
        <LogOut size={18} className="text-red-400" />
        <span className="text-sm font-medium text-red-400">Logout</span>
      </button>
    </div>
  );
}