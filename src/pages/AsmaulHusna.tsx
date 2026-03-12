import React from 'react';
import { motion } from 'motion/react';
import { ASMAUL_HUSNA } from '../data';

export default function AsmaulHusna() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6"
          >
            আসমাউল <span className="text-emerald-600 dark:text-emerald-400">হুসনা</span>
          </motion.h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            আল্লাহর ৯৯টি গুণবাচক নাম, অর্থ ও ফযিলত।
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ASMAUL_HUSNA.map((name, index) => (
            <motion.div
              key={name.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold mx-auto mb-4 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500 transition-colors">
                {name.id}
              </div>
              <h3 className="text-3xl font-arabic text-slate-800 dark:text-slate-200 mb-2">{name.arabic}</h3>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-1">{name.bangla}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{name.meaning}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
