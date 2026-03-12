import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, ListMusic, Hash, ClipboardList, 
  Compass, MapPin, Star, Tv, Moon, Heart, User, Calendar, Bell, Grid, RotateCcw, Headphones
} from 'lucide-react';

// Mock Kaaba icon
const KaabaIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 10h16" />
    <path d="M10 4v16" />
  </svg>
);

const amalItems = [
  { name: 'নামাযের সময়', icon: Clock, path: '/prayer-times', color: 'text-blue-600' },
  { name: 'তিলাওয়াত', icon: ListMusic, path: '/recitation', color: 'text-blue-600' },
  { name: 'হাফিজি তিলওয়াত', icon: Headphones, path: '/hafizi-tilawat', color: 'text-blue-600' },
  { name: 'তাসবীহ', icon: Hash, path: '/tasbih', color: 'text-blue-600' },
  { name: 'মুহাসাবাহ', icon: ClipboardList, path: '/muhasabah', color: 'text-blue-600' },
  { name: 'হজ্ব ও উমরা', icon: KaabaIcon, path: '/hajj-umrah', color: 'text-blue-600' },
];

export default function Amal() {
  const convertToBangla = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : banglaDigits[digit];
    }).join('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-12 px-4 text-center relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white dark:bg-slate-900/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <h1 className="text-4xl font-black mb-3 relative z-10">আমল</h1>
        <p className="text-emerald-100 opacity-90 text-lg relative z-10">প্রতিদিনের আমলসমূহ ও ইবাদত</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 relative z-20">
        {/* Amal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amalItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-900 transition-all active:scale-95"
              >
                <div className={`mb-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors ${item.color.replace('blue', 'emerald')}`}>
                  <Icon size={32} />
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-slate-200">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
