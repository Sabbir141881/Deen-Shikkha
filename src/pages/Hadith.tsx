import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageSquareQuote, ChevronRight, BookOpen } from 'lucide-react';
import { HADITH_DATA } from '../hadithData';

const HadithPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');

  const categories = useMemo(() => {
    const cats = new Set(HADITH_DATA.map(h => h.category));
    return ['সব', ...Array.from(cats)];
  }, []);

  const filteredHadiths = useMemo(() => {
    return HADITH_DATA.filter(hadith => {
      const matchesSearch = hadith.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hadith.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'সব' || hadith.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4"
          >
            <MessageSquareQuote className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            জনপ্রিয় হাদিস সমূহ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            রাসূলুল্লাহ (সা.)-এর পবিত্র বাণী ও জীবনদর্শনের এক সংকলন। এখানে ৫০০০-এরও বেশি গুরুত্বপূর্ণ হাদিস রয়েছে।
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="sticky top-20 z-10 bg-slate-50 dark:bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md py-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="হাদিস বা উৎস খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hadith List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredHadiths.length > 0 ? (
              filteredHadiths.map((hadith, index) => (
                <motion.div
                  key={hadith.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index % 10 * 0.05 }}
                  className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                          {hadith.category}
                        </span>
                      </div>
                      <p className="text-xl text-slate-800 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                        "{hadith.text}"
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          <BookOpen className="w-4 h-4" />
                          <span>উৎস: {hadith.source}</span>
                        </div>
                        <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700"
              >
                <div className="inline-flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                  <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">কোনো হাদিস পাওয়া যায়নি</h3>
                <p className="text-slate-500 dark:text-slate-400">আপনার সার্চ টার্ম পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HadithPage;
