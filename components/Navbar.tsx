"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function Navbar(): React.ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = (): void => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-slate-700 bg-slate-900 shadow-lg">
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-white transition-colors hover:text-blue-400"
        >
          MediaPlayer
        </Link>

        {/* Profile Avatar Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center rounded-full bg-slate-800 p-2 transition-colors hover:bg-slate-700 focus:outline-2 focus:outline-blue-500"
            aria-label="User profile menu"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <User size={24} className="text-white" />
          </button>

          {/* Dropdown Menu */}
          <ProfileDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
}