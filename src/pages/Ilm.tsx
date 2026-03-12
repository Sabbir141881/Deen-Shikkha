import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, MessageSquareQuote, Star, Moon, History, 
  Book, Library, FileText, Mic, GraduationCap, UserCheck, Clock
} from 'lucide-react';

const ilmItems = [
  { name: 'নবী-রাসূলদের জীবনী', icon: BookOpen, path: '/prophets', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'হাদিস', icon: MessageSquareQuote, path: '/hadith', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'আসমাউল হুসনা', icon: Star, path: '/asmaul-husna', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'সূরা সমূহ', icon: BookOpen, path: '/surahs', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'জান্নাত-জাহান্নাম', icon: Moon, path: '/jannah-jahannam', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'ইসলামের ইতিহাস', icon: History, path: '/history', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'শেষ জামানার ইতিহাস', icon: Clock, path: '/end-times', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'কুরআন শিক্ষা', icon: GraduationCap, path: '/quran-learning', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'নামায শিক্ষা', icon: UserCheck, path: '/prayer-learning', color: 'text-emerald-600 dark:text-emerald-400' },
];

export default function Ilm() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">ইলম</h1>
        <p className="text-emerald-100 opacity-90">দ্বীনি জ্ঞান অর্জন করুন</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ilmItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-900 transition-all active:scale-95"
              >
                <div className={`mb-4 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors ${item.color}`}>
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
