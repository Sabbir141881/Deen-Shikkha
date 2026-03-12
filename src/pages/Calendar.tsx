import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Moon, Sun } from 'lucide-react';
import { getBanglaDateManual, getHijriDateManual, toBanglaDigit } from '../utils/dateConverter';

const WEEKDAYS = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTHS_BN = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 bg-gray-50/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isFriday = date.getDay() === 5;

      // Format dates using manual converter
      const banglaDate = getBanglaDateManual(date);
      const hijriDate = getHijriDateManual(date);

      days.push(
        <div 
          key={day} 
          className={`h-28 p-2 border border-gray-100 dark:border-slate-800 relative group transition-colors flex flex-col justify-between
            ${isToday ? 'bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-500' : 'bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800'}
            ${isFriday ? 'bg-red-50/30 dark:bg-red-900/10' : ''}
          `}
        >
          {/* English Date */}
          <span className={`text-xl font-bold block ${isFriday ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-white'}`}>
            {day}
          </span>

          <div className="space-y-1">
            {/* Bangla Date */}
            <div className="flex items-center gap-1.5">
              <Sun size={12} className="text-amber-500 flex-shrink-0" />
              <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-none">
                {banglaDate.day} {banglaDate.month}
              </span>
            </div>

            {/* Hijri Date */}
            <div className="flex items-center gap-1.5">
              <Moon size={12} className="text-emerald-500 flex-shrink-0" />
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium leading-none">
                {hijriDate.day} {hijriDate.month}
              </span>
            </div>
          </div>

          {isToday && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
          )}
        </div>
      );
    }

    return days;
  };

  const todayBangla = getBanglaDateManual(currentDate);
  const todayHijri = getHijriDateManual(currentDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-900 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              ক্যালেন্ডার
            </h1>
            <div className="text-right">
              <p className="text-sm opacity-90">
                {todayHijri.day} {todayHijri.month}, {todayHijri.year} হিজরি
              </p>
              <p className="text-xs opacity-75">
                {todayBangla.day} {todayBangla.month}, {todayBangla.year} বঙ্গাব্দ
              </p>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <button onClick={prevMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">
              {MONTHS_BN[currentDate.getMonth()]} {toBanglaDigit(currentDate.getFullYear())}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
          {/* Weekdays Header */}
          <div className="grid grid-cols-7 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            {WEEKDAYS.map((day, index) => (
              <div 
                key={day} 
                className={`py-3 text-center text-sm font-bold ${index === 5 ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4 justify-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span>আজ</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun size={12} className="text-amber-500" />
            <span>বাংলা তারিখ</span>
          </div>
          <div className="flex items-center gap-1">
            <Moon size={12} className="text-emerald-500" />
            <span>হিজরি তারিখ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
