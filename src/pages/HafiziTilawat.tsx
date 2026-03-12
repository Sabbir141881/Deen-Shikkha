import React, { useState, useRef } from 'react';
import { Play, Pause, Headphones, Radio, Tv } from 'lucide-react';
import { motion } from 'motion/react';

const RADIO_STATIONS = [
  {
    id: 'radio-mix',
    title: '২৪/৭ লাইভ কুরআন (মিক্স)',
    subtitle: 'বিশ্বের বিভিন্ন বিখ্যাত কারীদের নিরবচ্ছিন্ন তেলাওয়াত',
    url: 'https://qurango.net/radio/mix'
  },
  {
    id: 'radio-mishary',
    title: '২৪/৭ মিশারি রশিদ আল-আফাসি',
    subtitle: 'শুধুমাত্র শাইখ মিশারি রশিদের তেলাওয়াত',
    url: 'https://qurango.net/radio/mishary_alafasi'
  },
  {
    id: 'radio-basit',
    title: '২৪/৭ আব্দুল বাসিত আব্দুস সামাদ',
    subtitle: 'বিখ্যাত কারী আব্দুল বাসিত (রহ.) এর তেলাওয়াত',
    url: 'https://qurango.net/radio/abdulbasit_abdussamad_mojawwad'
  }
];

const BTV_RECORDS = [
  {
    id: 'btv-1',
    title: 'বিটিভির সকালের তিলওয়াত',
    subtitle: 'সূরা আল-ফাতিহা',
    url: 'https://server8.mp3quran.net/afs/001.mp3'
  },
  {
    id: 'btv-2',
    title: 'বিটিভির জুমার তিলওয়াত',
    subtitle: 'সূরা আল-জুমুআহ (আংশিক)',
    url: 'https://server8.mp3quran.net/afs/062.mp3'
  },
  {
    id: 'btv-3',
    title: 'মাগরিবের আযানের পূর্বের তিলওয়াত',
    subtitle: 'সূরা আর-রহমান (আংশিক)',
    url: 'https://server8.mp3quran.net/afs/055.mp3'
  },
  {
    id: 'btv-4',
    title: 'বিটিভির তিলওয়াত',
    subtitle: 'কারী সাইফুল ইসলাম পারভেজ',
    url: 'https://server8.mp3quran.net/afs/036.mp3'
  }
];

export default function HafiziTilawat() {
  const [currentPlaying, setCurrentPlaying] = useState<number | string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (id: number | string, url: string) => {
    if (currentPlaying === id) {
      audioRef.current?.pause();
      setCurrentPlaying(null);
      setIsLoading(false);
    } else {
      if (audioRef.current) {
        setIsLoading(true);
        // Reset the current playing state temporarily so the UI shows loading
        setCurrentPlaying(id); 
        audioRef.current.src = url;
        audioRef.current.play()
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsLoading(false);
            setCurrentPlaying(null);
          });
      }
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-4">
            <Headphones size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">হাফিজি তিলওয়াত</h1>
          <p className="text-slate-600 dark:text-slate-400">হৃদয় জুড়ানো বাছাইকৃত কুরআন তেলাওয়াত ও লাইভ রেডিও</p>
        </div>

        <audio ref={audioRef} onEnded={() => setCurrentPlaying(null)} />

        {/* Live Radio Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Radio className="text-red-500 animate-pulse" size={24} />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">লাইভ কুরআন রেডিও (২৪/৭)</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            {RADIO_STATIONS.map((radio, index) => (
              <motion.div
                key={radio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border transition-all ${
                  currentPlaying === radio.id 
                    ? 'border-red-500 ring-1 ring-red-500' 
                    : 'border-slate-100 dark:border-slate-700 hover:border-red-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-grow">
                    <button
                      onClick={() => togglePlay(radio.id, radio.url)}
                      disabled={isLoading && currentPlaying !== radio.id}
                      className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        currentPlaying === radio.id
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                          : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100'
                      } ${(isLoading && currentPlaying !== radio.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading && currentPlaying === radio.id ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : currentPlaying === radio.id ? (
                        <Pause size={28} className="fill-current" />
                      ) : (
                        <Play size={28} className="fill-current ml-1" />
                      )}
                    </button>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                          {radio.title}
                        </h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full uppercase tracking-wider animate-pulse">Live</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {radio.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {currentPlaying === radio.id && !isLoading && (
                    <div className="flex gap-1 px-2 items-end h-8">
                      <span className="w-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '60%', animationDelay: '0ms' }}></span>
                      <span className="w-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '100%', animationDelay: '150ms' }}></span>
                      <span className="w-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '40%', animationDelay: '300ms' }}></span>
                      <span className="w-1.5 bg-red-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '80%', animationDelay: '450ms' }}></span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BTV Records Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Tv className="text-emerald-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">বিটিভির তিলওয়াত রেকর্ড</h2>
          </div>
          <div className="space-y-4">
            {BTV_RECORDS.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border transition-all ${
                  currentPlaying === record.id 
                    ? 'border-emerald-500 ring-1 ring-emerald-500' 
                    : 'border-slate-100 dark:border-slate-700 hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-grow">
                    <button
                      onClick={() => togglePlay(record.id, record.url)}
                      disabled={isLoading && currentPlaying !== record.id}
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        currentPlaying === record.id
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
                      } ${(isLoading && currentPlaying !== record.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading && currentPlaying === record.id ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : currentPlaying === record.id ? (
                        <Pause size={24} className="fill-current" />
                      ) : (
                        <Play size={24} className="fill-current ml-1" />
                      )}
                    </button>
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        {record.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {record.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {currentPlaying === record.id && !isLoading && (
                    <div className="flex gap-1 px-2 items-end h-6">
                      <span className="w-1.5 bg-emerald-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '60%', animationDelay: '0ms' }}></span>
                      <span className="w-1.5 bg-emerald-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '100%', animationDelay: '150ms' }}></span>
                      <span className="w-1.5 bg-emerald-500 rounded-full animate-[bounce_1s_infinite]" style={{ height: '40%', animationDelay: '300ms' }}></span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
