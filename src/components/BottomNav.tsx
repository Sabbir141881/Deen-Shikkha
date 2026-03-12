import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Heart, Grid, Hand } from 'lucide-react';

const navItems = [
  { name: 'ইলম', icon: Book, path: '/ilm' },
  { name: 'আমল', icon: Hand, path: '/amal' },
  { name: 'সেবা', icon: Heart, path: '/seba' },
  { name: 'বিবিধ', icon: Grid, path: '/bibidh' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-4 py-2 flex items-center justify-around z-50 transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'
            }`}
          >
            <Icon size={24} className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
