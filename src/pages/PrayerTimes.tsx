import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, MapPin, Calendar, Info, 
  ChevronLeft, RefreshCw, Sun, Moon, 
  CloudSun, CloudMoon, Sunset, Sunrise
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import { BANGLADESH_DISTRICTS } from '../data/districts';

export default function PrayerTimesPage() {
  const [time, setTime] = useState(new Date());
  const [selectedDistrictId, setSelectedDistrictId] = useState(() => {
    return localStorage.getItem('selectedDistrictId') || 'dhaka';
  });
  const [isLoading, setIsLoading] = useState(false);

  const selectedDistrict = BANGLADESH_DISTRICTS.find(d => d.id === selectedDistrictId) || BANGLADESH_DISTRICTS[0];

  useEffect(() => {
    localStorage.setItem('selectedDistrictId', selectedDistrictId);
  }, [selectedDistrictId]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const coords = new Coordinates(selectedDistrict.lat, selectedDistrict.lng);
  const params = CalculationMethod.Karachi(); 
  const prayerTimes = new PrayerTimes(coords, time, params);
  const sunnahTimes = new SunnahTimes(prayerTimes);

  const convertToBangla = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : banglaDigits[digit];
    }).join('');
  };

  const formatTime = (date: Date | null | undefined) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const prayers = [
    { id: 'fajr', name: 'ফজর', time: prayerTimes.fajr, icon: Sunrise, color: 'from-blue-400 to-indigo-500' },
    { id: 'sunrise', name: 'সূর্যোদয়', time: prayerTimes.sunrise, icon: Sun, color: 'from-orange-300 to-yellow-500' },
    { id: 'dhuhr', name: 'যোহর', time: prayerTimes.dhuhr, icon: CloudSun, color: 'from-yellow-400 to-orange-500' },
    { id: 'asr', name: 'আসর', time: prayerTimes.asr, icon: Sun, color: 'from-orange-400 to-red-500' },
    { id: 'maghrib', name: 'মাগরিব', time: prayerTimes.maghrib, icon: Sunset, color: 'from-red-400 to-purple-600' },
    { id: 'isha', name: 'এশা', time: prayerTimes.isha, icon: CloudMoon, color: 'from-indigo-600 to-slate-900' },
  ];

  const currentPrayer = prayerTimes.currentPrayer();
  const nextPrayer = prayerTimes.nextPrayer();

  const prayerNames: { [key: string]: string } = {
    fajr: 'ফজর',
    sunrise: 'সূর্যোদয়',
    dhuhr: 'যোহর',
    asr: 'আসর',
    maghrib: 'মাগরিব',
    isha: 'এশা',
    none: 'অপেক্ষা করুন'
  };

  const nextPrayerTime = nextPrayer !== 'none' ? prayerTimes.timeForPrayer(nextPrayer) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-800 font-bold">নামাজের সময়সূচী লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/amal" className="inline-flex items-center gap-2 text-emerald-100 mb-6 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span>ফিরে যান</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black mb-2">নামাজের সময়সূচী</h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-emerald-100/80 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <MapPin size={14} />
                  <span className="text-xs font-bold">{selectedDistrict.name}, বাংলাদেশ</span>
                </div>
                
                <div className="relative">
                  <select 
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="bg-white text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black shadow-lg hover:bg-emerald-50 active:scale-95 transition-all outline-none appearance-none pr-8 cursor-pointer"
                  >
                    {BANGLADESH_DISTRICTS.map(district => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-700">
                    <ChevronLeft size={12} className="-rotate-90" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <Calendar size={18} className="text-emerald-300" />
                <span className="text-sm font-bold">{formatDate(time)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-emerald-300" />
                <span className="text-2xl font-mono font-black">{time.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        {/* Current & Next Prayer Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-900/5 border border-emerald-50 dark:border-slate-800 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-slate-800">
            <div className="pb-6 md:pb-0 md:pr-8">
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] mb-4 block">বর্তমান ওয়াক্ত</span>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                  <Clock size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-800 dark:text-slate-100">{prayerNames[currentPrayer] || 'অপেক্ষা করুন'}</h2>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">এখন নামাজের সময় চলছে</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 md:pt-0 md:pl-8">
              <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.3em] mb-4 block">পরবর্তী ওয়াক্ত</span>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-200 dark:shadow-none">
                  <RefreshCw size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-800 dark:text-slate-100">{prayerNames[nextPrayer] || 'ফজর'}</h2>
                  <p className="text-orange-600 dark:text-orange-400 font-bold">{nextPrayerTime ? `${formatTime(nextPrayerTime)} মিনিটে শুরু` : 'আগামীকাল ফজর'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times List */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-black text-gray-800 dark:text-slate-100 px-2">আজকের পূর্ণাঙ্গ সময়সূচী</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prayers.map((prayer, index) => {
              const Icon = prayer.icon;
              const isCurrent = currentPrayer.toLowerCase() === prayer.id.toLowerCase();
              
              return (
                <motion.div 
                  key={prayer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-[2rem] border transition-all flex items-center justify-between ${
                    isCurrent 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-md scale-[1.02]' 
                      : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prayer.color} flex items-center justify-center text-white shadow-sm`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className={`font-black ${isCurrent ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-800 dark:text-slate-200'}`}>{prayer.name}</h4>
                      {isCurrent && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">চলমান</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-mono font-black ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-slate-400'}`}>
                      {formatTime(prayer.time)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sunnah Times (Tahajjud, etc) */}
        <div className="bg-slate-900 dark:bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="text-emerald-400" />
              <h3 className="text-xl font-black">শেষ রাতের আমল</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-3xl p-5 border border-white/10">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2 block">তাহাজ্জুদ ও শেষ রাত</span>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100/70 text-sm">শুরু হবে</span>
                  <span className="text-2xl font-mono font-black text-emerald-400">{formatTime(sunnahTimes.lastThirdOfTheNight)}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-3xl p-5 border border-white/10">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block">মধ্যরাত</span>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100/70 text-sm">সময়</span>
                  <span className="text-2xl font-mono font-black text-blue-400">{formatTime(sunnahTimes.middleOfTheNight)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-6 flex gap-4">
          <Info className="text-emerald-600 shrink-0" size={24} />
          <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
            এই সময়সূচীটি <strong>করাচি মেথড</strong> এবং আপনার বর্তমান অবস্থানের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে হিসাব করা হয়েছে। স্থানীয় মসজিদের জামাতের সময়ের সাথে এটি সামান্য ভিন্ন হতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
}
