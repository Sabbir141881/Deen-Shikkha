import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Moon, Radio } from 'lucide-react';

import { getHijriDateManual } from '../utils/dateConverter';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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

  const getHijriDate = (date: Date) => {
    const hijri = getHijriDateManual(date);
    return `${hijri.day} ${hijri.month} ${hijri.year} হিজরি`;
  };

  return (
    <div className="bg-emerald-950 text-emerald-50 py-2 px-4 text-sm font-medium border-b border-emerald-800 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        
        {/* Date Section */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-800/50">
            <Moon className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-50">{getHijriDate(time)}</span>
          </div>
          
          <div className="hidden md:block w-px h-4 bg-emerald-800"></div>
          
          <div className="flex items-center gap-2 bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-800/50">
            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
            <span>{formatDate(time)}</span>
          </div>
        </div>
        
        {/* Time & Live Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Live</span>
          </div>

          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-lg border border-emerald-500/20 shadow-inner min-w-[140px] justify-center">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-mono tracking-widest text-lg font-bold text-white tabular-nums">
              {formatTime(time)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
