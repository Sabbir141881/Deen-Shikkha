import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, TrendingUp, HelpCircle, Trophy, Users, 
  ShoppingCart, Bookmark, Home as HomeIcon
} from 'lucide-react';

const sebaItems = [
  { name: 'যাকাত', icon: Coins, path: '/zakat', color: 'text-orange-600' },
  { name: 'বিনিয়োগ', icon: TrendingUp, path: '/investment', color: 'text-orange-600' },
  { name: 'দ্বীনি জিজ্ঞাসা', icon: HelpCircle, path: '/qa', color: 'text-orange-600' },
  { name: 'কুইজ', icon: Trophy, path: '/quiz', color: 'text-orange-600' },
  { name: 'বিবাহ', icon: Users, path: '/marriage', color: 'text-orange-600' },
  { name: 'কেনাকাটা', icon: ShoppingCart, path: '/shopping', color: 'text-orange-600' },
  { name: 'বুকমার্ক', icon: Bookmark, path: '/bookmarks', color: 'text-orange-600' },
  { name: 'আমার মসজিদ', icon: HomeIcon, path: '/my-mosque', color: 'text-orange-600' },
];

export default function Seba() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-orange-600 dark:bg-orange-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">সেবা</h1>
        <p className="text-orange-100 opacity-90">ইসলামিক সেবাসমূহ</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sebaItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md hover:border-orange-100 dark:hover:border-orange-900 transition-all active:scale-95"
              >
                <div className={`mb-4 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30 transition-colors ${item.color}`}>
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
