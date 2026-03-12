import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, MapPin, Star, Tv, Moon, Heart, User, Calendar, Bell, Grid
} from 'lucide-react';

const bibidhItems = [
  { name: 'কিবলা', icon: Compass, path: '/qibla', color: 'text-purple-600' },
  { name: 'মসজিদ খুঁজি', icon: MapPin, path: '/find-mosque', color: 'text-purple-600' },
  { name: 'ইসলামিক নাম', icon: User, path: '/names', color: 'text-purple-600' },
  { name: 'ক্যালেন্ডার', icon: Calendar, path: '/calendar', color: 'text-purple-600' },
  { name: 'গুরুত্বপূর্ণ দিন', icon: Bell, path: '/important-days', color: 'text-purple-600' },
];

export default function Bibidh() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-purple-700 dark:bg-purple-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">বিবিধ</h1>
        <p className="text-purple-100 opacity-90">অন্যান্য বিষয়সমূহ</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bibidhItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md hover:border-purple-100 dark:hover:border-purple-900 transition-all active:scale-95"
              >
                <div className={`mb-4 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 transition-colors ${item.color}`}>
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
