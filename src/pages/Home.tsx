import React, { useState, useEffect } from 'react';
import { 
  Search, Book, Library, MessageSquareQuote, FileText, Mic, GraduationCap, UserCheck,
  Clock, Music, Hash, ClipboardList, Coins, TrendingUp, HelpCircle, Trophy, Users, 
  ShoppingCart, Bookmark, Home as HomeIcon, Compass, MapPin, Star, Tv, Moon, Heart, 
  User, Calendar, Bell, Grid, ChevronDown, BellRing, BookOpen, History, Sun, CheckCircle, RotateCcw, Headphones
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DASHBOARD_CATEGORIES, PROPHETS_DATA } from '../data';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { BANGLADESH_DISTRICTS } from '../data/districts';
import { getDailyContent } from '../data/dailyContent';

import { getHijriDateManual } from '../utils/dateConverter';

const iconMap: { [key: string]: any } = {
  Book, Library, MessageSquareQuote, FileText, Mic, GraduationCap, UserCheck,
  Clock, Music, Hash, ClipboardList, Coins, TrendingUp, HelpCircle, Trophy, Users,
  ShoppingCart, Bookmark, Home: HomeIcon, Compass, MapPin, Star, Tv, Moon, Heart,
  User, Calendar, Bell, Grid, BookOpen, History, Sun, CheckCircle, RotateCcw, Headphones
};

// Mock Kaaba icon since it's not in Lucide
const KaabaIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 10h16" />
    <path d="M10 4v16" />
  </svg>
);

// Mock Hands icon
const HandsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [selectedDistrictId, setSelectedDistrictId] = useState(() => {
    return localStorage.getItem('selectedDistrictId') || 'dhaka';
  });

  const selectedDistrict = BANGLADESH_DISTRICTS.find(d => d.id === selectedDistrictId) || BANGLADESH_DISTRICTS[0];

  useEffect(() => {
    localStorage.setItem('selectedDistrictId', selectedDistrictId);
  }, [selectedDistrictId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getHijriDate = (date: Date) => {
    const hijri = getHijriDateManual(date, selectedDistrict.lat, selectedDistrict.lng);
    return `${hijri.day} ${hijri.month} ${hijri.year} হিজরি`;
  };

  const formatTimeParts = (date: Date) => {
    const timeStr = date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    // Extract AM/PM or equivalent robustly
    const parts = timeStr.split(/\s+/);
    if (parts.length > 1) {
      return { time: parts[0], period: parts[1] };
    }
    const match = timeStr.match(/([\d০-৯:]+)(.*)/);
    if (match) {
      return { time: match[1], period: match[2].trim() };
    }
    return { time: timeStr, period: '' };
  };

  const timeParts = formatTimeParts(time);

  // Prayer Times Logic using Adhan
  const getPrayerData = () => {
    const coords = new Coordinates(selectedDistrict.lat, selectedDistrict.lng);
    const params = CalculationMethod.Karachi();
    const prayerTimes = new PrayerTimes(coords, time, params);

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    const current = prayerTimes.currentPrayer();
    const next = prayerTimes.nextPrayer();
    
    const prayerNames: { [key: string]: string } = {
      fajr: 'ফজর',
      sunrise: 'সূর্যোদয়',
      dhuhr: 'যোহর',
      asr: 'আসর',
      maghrib: 'মাগরিব',
      isha: 'এশা',
      none: 'অপেক্ষা করুন'
    };

    const currentName = prayerNames[current] || 'অপেক্ষা করুন';
    const nextName = prayerNames[next] || 'ফজর';
    
    const startTime = prayerTimes.timeForPrayer(current) || prayerTimes.fajr;
    const endTime = prayerTimes.timeForPrayer(next) || prayerTimes.fajr;

    // Progress calculation
    const now = time.getTime();
    const start = startTime.getTime();
    const end = endTime.getTime();
    let progress = ((now - start) / (end - start)) * 100;
    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    const remainingMs = end - now;
    const remainingMin = Math.max(0, Math.floor(remainingMs / 60000));
    const h = Math.floor(remainingMin / 60);
    const m = remainingMin % 60;
    const remainingStr = h > 0 ? `${convertToBangla(h)} ঘণ্টা ${convertToBangla(m)} মিনিট` : `${convertToBangla(m)} মিনিট`;

    return {
      currentName,
      range: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      progress,
      remaining: remainingStr,
      sahri: formatTime(prayerTimes.fajr),
      iftar: formatTime(prayerTimes.maghrib)
    };
  };

  const convertToBangla = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : banglaDigits[digit];
    }).join('');
  };

  const prayerData = getPrayerData();
  
  // Get daily content based on current date
  const dailyContent = React.useMemo(() => getDailyContent(), [time.getDate()]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-slate-950 pb-24 transition-colors">
      {/* Bismillah Bar - Restored and Prominent */}
      <div className="bg-white dark:bg-slate-900 text-center py-4 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors flex flex-col items-center justify-center gap-1">
        <span className="text-3xl md:text-4xl font-arabic text-emerald-900 dark:text-emerald-400 leading-relaxed drop-shadow-sm">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </span>
        <span className="text-sm md:text-base font-medium text-emerald-700 dark:text-emerald-500">
          বিসমিল্লাহির রাহমানির রাহিম
        </span>
      </div>

      {/* Live Clock & Date Panel - Redesigned & Beautiful */}
      <div className="bg-gradient-to-b from-[#022C22] to-[#011F18] mx-0 py-2 px-4 flex flex-col items-center gap-2 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px]"></div>
        </div>

        {/* Date Section - Glassmorphism style */}
        <div className="flex items-center justify-center gap-2 w-full max-w-md z-10">
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl py-1 px-2 flex flex-col items-center gap-0.5 shadow-xl transition-transform hover:scale-[1.02]">
            <Moon size={12} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            <span className="text-emerald-50 text-[9px] font-semibold tracking-wide">{getHijriDate(time)}</span>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl py-1 px-2 flex flex-col items-center gap-0.5 shadow-xl transition-transform hover:scale-[1.02]">
            <Calendar size={12} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            <span className="text-emerald-50 text-[9px] font-semibold tracking-wide">{formatDate(time)}</span>
          </div>
        </div>

        {/* Clock Section - Premium Plate */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Subtle Live Pulse Dot (No Text) */}
          <div className="absolute -top-1 -right-1 z-20">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#011F18] border border-emerald-500/30 rounded-full py-1.5 px-4 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1)] relative group">
            {/* Inner decorative ring */}
            <div className="absolute inset-1 border border-emerald-500/5 rounded-full pointer-events-none"></div>
            
            <div className="flex items-baseline gap-2">
              <Clock size={14} className="text-emerald-400/60 self-center" />
              <span className="text-xl font-mono font-black text-white tracking-widest tabular-nums drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                {timeParts.time}
              </span>
              <span className="text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest">
                {timeParts.period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Times Card - Live & Redesigned */}
      <div className="mx-4 mt-4 bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-slate-800 relative overflow-hidden group transition-colors">
        {/* Subtle background decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"></div>

        {/* Sahri & Iftar Timeline */}
        <div className="relative mb-4 pt-1">
          <div className="flex items-center justify-between px-2 relative">
            {/* Connecting Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100 dark:from-blue-900/50 dark:via-yellow-900/50 dark:to-orange-900/50"></div>
            
            {/* Noon Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-1 h-1 bg-yellow-400 rounded-full mb-0.5 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
              <span className="text-[8px] font-bold text-gray-400 dark:text-slate-500 tracking-tighter">১২:০৪</span>
            </div>

            {/* Sahri End */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-sm border border-blue-100/50 dark:border-blue-800/50 group-hover:scale-110 transition-transform">
                <Moon size={14} className="text-blue-500 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">সাহরি শেষ</p>
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400">{prayerData.sahri}</p>
              </div>
            </div>

            {/* Iftar Time */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shadow-sm border border-orange-100/50 dark:border-orange-800/50 group-hover:scale-110 transition-transform">
                <Sun size={14} className="text-orange-500 dark:text-orange-400" />
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">ইফতার</p>
                <p className="text-[10px] font-black text-orange-600 dark:text-orange-400">{prayerData.iftar}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Prayer Info */}
        <div className="bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl p-3 border border-gray-100/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                <Clock size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-gray-800 dark:text-slate-100 leading-none">{prayerData.currentName}</h3>
                  <select 
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full outline-none border-none cursor-pointer"
                  >
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] font-bold text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">{prayerData.range}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">চলমান</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500">{prayerData.remaining} বাকি</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-emerald-100/50 dark:bg-emerald-900/30">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${prayerData.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-400 to-emerald-600 relative overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Cover Photo - Daily Changing */}
      <div className="mx-4 mt-6 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 relative h-32 group">
        <img 
          src={dailyContent.image} 
          alt="Islamic Daily Wallpaper" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1542300058-b94b8ab7411b?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
          <p className="text-white text-xs font-medium drop-shadow-md line-clamp-2 leading-relaxed">
            "{dailyContent.hadith}"
          </p>
          <p className="text-emerald-200 text-[10px] font-bold mt-1 drop-shadow-md">
            — {dailyContent.source}
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="mx-4 mt-4 bg-[#1A3A34] dark:bg-emerald-900/40 rounded-2xl p-4 flex items-center justify-between overflow-hidden relative">
        <div className="z-10">
          <h3 className="text-white font-bold text-lg mb-1">বিশুদ্ধ কুরআন শিক্ষা, ক্লাস - ১৭</h3>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-xs font-medium">'র' পড়ার নিয়ম ও ওয়াকফের বিবরণ</span>
            </div>
            <button className="bg-white text-[#1A3A34] px-3 py-1 rounded-lg text-xs font-bold">দেখতে ক্লিক করুন</button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-emerald-900/50 skew-x-[-20deg] translate-x-12"></div>
        <Book size={48} className="text-white/20 absolute right-4" />
      </div>

      {/* Dashboard Categories */}
      <div className="mt-6 space-y-8">
        {DASHBOARD_CATEGORIES.map((category) => (
          <section key={category.title} className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-1 h-6 rounded-full ${category.color.replace('text', 'bg')}`}></div>
                <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
              </div>
              <button className="p-2 bg-white rounded-full shadow-sm">
                <Search size={20} className="text-emerald-600" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {category.items.map((item) => {
                const Icon = item.icon === 'Kaaba' ? KaabaIcon : (item.icon === 'Hands' ? HandsIcon : iconMap[item.icon] || Grid);
                return (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center text-center group active:scale-95 transition-transform"
                  >
                    <div className="mb-2 p-2 rounded-xl group-hover:bg-gray-50 transition-colors">
                      <Icon size={28} className={category.color} />
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 leading-tight">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
