'use client';

import Link from 'next/link';

import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="flex h-[72px] items-center justify-between px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            📚
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Personal Book Manager
            </h1>

            <p className="text-xs text-slate-500">
              Manage your reading journey
            </p>
          </div>
        </Link>

        <UserMenu />
      </div>
    </header>
  );
}