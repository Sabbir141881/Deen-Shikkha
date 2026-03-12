import React, { useState } from 'react';
import { ArrowLeft, Search, User, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOYS_NAMES, GIRLS_NAMES } from '../data/islamicNamesData';

export default function IslamicNames() {
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys');
  const [searchQuery, setSearchQuery] = useState('');

  const currentNames = activeTab === 'boys' ? BOYS_NAMES : GIRLS_NAMES;
  
  const filteredNames = currentNames.filter(name => 
    name.bangla.includes(searchQuery) || 
    (name.meaning && name.meaning.includes(searchQuery)) ||
    (name.elevated && name.elevated.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-purple-700 dark:bg-purple-900 text-white py-6 px-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/bibidh" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">অর্থসহ ইসলামিক নাম</h1>
            <p className="text-purple-100 text-sm opacity-90">ছেলে ও মেয়েদের সুন্দর ইসলামিক নাম</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="নাম বা অর্থ দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('boys')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'boys'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            ছেলেদের নাম
          </button>
          <button
            onClick={() => setActiveTab('girls')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'girls'
                ? 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            মেয়েদের নাম
          </button>
        </div>

        {/* Names List */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNames.length > 0 ? (
            filteredNames.map((name, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow flex flex-col justify-center"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {name.bangla}
                  </h3>
                  <span className="text-2xl font-arabic text-purple-600 dark:text-purple-400">
                    {name.arabic}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium">অর্থ:</span> {name.meaning || name.elevated}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
              <p className="text-gray-500 dark:text-gray-400">কোনো নাম পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
