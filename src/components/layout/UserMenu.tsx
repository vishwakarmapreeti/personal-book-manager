'use client';

import { useEffect } from 'react';

import { FiUser } from 'react-icons/fi';

import { useAuthStore } from '@/store/auth.store';

export default function UserMenu() {
  const {
    user,
    fetchCurrentUser,
  } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
        <FiUser size={18} />
      </div>

      <div className="hidden md:block">
        <p className="text-sm font-semibold text-slate-900">
          {user?.fullName ?? 'Loading...'}
        </p>

        <p className="text-xs text-slate-500">
          {user?.email ?? ''}
        </p>
      </div>
    </div>
  );
}