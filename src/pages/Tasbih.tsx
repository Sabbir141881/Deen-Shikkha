import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hash, RotateCcw, ChevronLeft, 
  Info, Star, Heart, Sparkles, 
  ChevronRight, Volume2, VolumeX
} from 'lucide-react';
import { Link } from 'react-router-dom';

const COMMON_ZIKIRS = [
  { name: 'সুবহানাল্লাহ', count: 33, meaning: 'আল্লাহ অতি পবিত্র' },
  { name: 'আলহামদুলিল্লাহ', count: 33, meaning: 'সকল প্রশংসা আল্লাহর' },
  { name: 'আল্লাহু আকবার', count: 34, meaning: 'আল্লাহ সর্বশ্রেষ্ঠ' },
  { name: 'লা ইলাহা ইল্লাল্লাহ', count: 100, meaning: 'আল্লাহ ছাড়া কোনো উপাস্য নেই' },
  { name: 'আস্তাগফিরুল্লাহ', count: 100, meaning: 'আমি আল্লাহর কাছে ক্ষমা চাই' },
  { name: 'সুবহানাল্লাহি ওয়া বিহামদিহি', count: 100, meaning: 'আল্লাহ পবিত্র এবং সকল প্রশংসা তাঁরই' },
];

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedZikir, setSelectedZikir] = useState(COMMON_ZIKIRS[0]);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  const convertToBangla = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : banglaDigits[digit];
    }).join('');
  };

  const handleIncrement = () => {
    setCount(c => c + 1);
    setTotalCount(t => t + 1);
    setVibrate(true);
    setTimeout(() => setVibrate(false), 100);
    
    if (isSoundOn) {
      // Simple click sound using Audio API if needed, 
      // but for now we'll just simulate the interaction
    }

    // Haptic feedback if supported
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/amal" className="inline-flex items-center gap-2 text-emerald-100 mb-6 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span>ফিরে যান</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">তাসবীহ ও জিকির</h1>
              <p className="text-emerald-100/80 font-medium">আল্লাহর জিকিরে অন্তর প্রশান্ত হয়</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-colors"
              >
                {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Counter Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl shadow-emerald-900/10 border border-emerald-50 dark:border-slate-800 flex flex-col items-center text-center">
          
          {/* Selected Zikir Display */}
          <div className="mb-8 w-full">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-4">
              <Sparkles size={14} className="text-emerald-600" />
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">বর্তমান জিকির</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 dark:text-slate-100 mb-2">{selectedZikir.name}</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm italic">"{selectedZikir.meaning}"</p>
          </div>

          {/* Counter Display */}
          <div className="relative mb-12 group">
            <motion.div 
              animate={vibrate ? { scale: [1, 1.1, 1] } : {}}
              className="text-[10rem] leading-none font-mono font-black text-emerald-600 dark:text-emerald-400 tabular-nums drop-shadow-2xl"
            >
              {convertToBangla(count.toString().padStart(2, '0'))}
            </motion.div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-slate-800 px-4 py-1 rounded-full border border-gray-200 dark:border-slate-700">
              <span className="text-[10px] font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest">মোট: {convertToBangla(totalCount)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 w-full max-w-md">
            <motion.button 
              whileTap={{ rotate: -180, scale: 0.9 }}
              onClick={handleReset}
              className="p-6 bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 rounded-[2rem] transition-all hover:bg-gray-200 dark:hover:bg-slate-700 shadow-sm"
            >
              <RotateCcw size={28} />
            </motion.button>
            
            <button 
              onClick={handleIncrement}
              className="flex-1 py-8 bg-emerald-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-emerald-200 dark:shadow-none active:scale-[0.95] transition-all hover:bg-emerald-600 flex items-center justify-center gap-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]"></div>
              <span>জিকির করুন</span>
              <Hash size={24} className="opacity-50" />
            </button>
          </div>
        </div>

        {/* Common Zikirs List */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xl font-black text-gray-800 dark:text-slate-100">জনপ্রিয় জিকিরসমূহ</h3>
            <Info size={18} className="text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMMON_ZIKIRS.map((zikir) => (
              <button
                key={zikir.name}
                onClick={() => {
                  setSelectedZikir(zikir);
                  setCount(0);
                }}
                className={`p-5 rounded-[2rem] border text-left transition-all flex items-center justify-between group ${
                  selectedZikir.name === zikir.name 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-md' 
                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-emerald-100 dark:hover:border-emerald-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedZikir.name === zikir.name 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-50 dark:bg-slate-800 text-gray-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 group-hover:text-emerald-500'
                  }`}>
                    <Star size={20} />
                  </div>
                  <div>
                    <h4 className={`font-black ${selectedZikir.name === zikir.name ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-800 dark:text-slate-200'}`}>
                      {zikir.name}
                    </h4>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">লক্ষ্য: {convertToBangla(zikir.count)} বার</p>
                  </div>
                </div>
                <ChevronRight size={18} className={selectedZikir.name === zikir.name ? 'text-emerald-500' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>

        {/* Virtues of Zikir */}
        <div className="mt-12 bg-slate-900 dark:bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-red-400" />
              <h3 className="text-xl font-black">জিকিরের ফজিলত</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "জিকিরকারী এবং জিকির না কারীর উদাহরণ হলো জীবিত ও মৃত ব্যক্তির মতো।" (সহীহ বুখারী)
            </p>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
              <span>জিকির অন্তরকে প্রশান্ত করে</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
