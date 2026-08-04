'use client';

import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import {
  FiBookOpen,
  FiHome,
  FiLogOut,
} from 'react-icons/fi';

import toast from 'react-hot-toast';

import { logout } from '@/services/auth.service';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: FiHome,
  },
  {
    label: 'My Books',
    href: '/books',
    icon: FiBookOpen,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await logout();

      toast.success(response.message);

      router.replace('/signin');

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          'Logout failed'
      );
    }
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <nav className="flex-1 space-y-2 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}