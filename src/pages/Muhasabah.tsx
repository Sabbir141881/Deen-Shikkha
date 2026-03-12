import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Calendar, Trophy, AlertCircle } from 'lucide-react';
import { ALL_MUHASABAH_TASKS, Task } from '../data/muhasabah';

// Helper function to get a deterministic random subset of tasks based on a seed
function getDailyTasks(seed: number, count: number): Task[] {
  // Simple seeded random number generator
  const random = (s: number) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };

  // Create a copy of the tasks array
  const shuffled = [...ALL_MUHASABAH_TASKS];
  
  // Fisher-Yates shuffle using the seeded random
  let currentSeed = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random(currentSeed++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure we have a mix of categories if possible
  const selected: Task[] = [];
  const categories = [...new Set(ALL_MUHASABAH_TASKS.map(t => t.category))];
  
  // First, try to get at least one from each category
  for (const cat of categories) {
    const task = shuffled.find(t => t.category === cat && !selected.includes(t));
    if (task) selected.push(task);
  }

  // Fill the rest up to 'count'
  for (const task of shuffled) {
    if (selected.length >= count) break;
    if (!selected.includes(task)) {
      selected.push(task);
    }
  }

  return selected;
}

export default function Muhasabah() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  // Calculate the seed based on the current date, changing every 2 days
  const activeTasks = useMemo(() => {
    const now = new Date();
    // Use UTC to avoid timezone issues
    const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
    // Change every 2 days
    const seed = Math.floor(daysSinceEpoch / 2);
    return getDailyTasks(seed, 14);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    const saved = localStorage.getItem(`muhasabah_${today}`);
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompleted);
    localStorage.setItem(`muhasabah_${currentDate}`, JSON.stringify(newCompleted));
  };

  const progress = Math.round((completedTasks.length / activeTasks.length) * 100) || 0;

  const categories = [...new Set(activeTasks.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <h1 className="text-4xl font-black mb-3 relative z-10">মুহাসাবাহ</h1>
        <p className="text-emerald-100 opacity-90 text-lg relative z-10">দৈনন্দিন আমলের হিসাব-নিকাশ</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-emerald-900/5 mb-8 border border-emerald-50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
              <Calendar size={24} />
              <span className="font-bold text-lg">আজকের আমল</span>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Trophy size={24} />
              <span className="font-black text-xl">{progress}%</span>
            </div>
          </div>

          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-4 mb-2 overflow-hidden">
            <motion.div 
              className="bg-emerald-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 text-center mt-2">
            {completedTasks.length} / {activeTasks.length} টি আমল সম্পন্ন হয়েছে
          </p>
        </div>

        <div className="space-y-8">
          {categories.map(category => (
            <div key={category} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-slate-800">
              <h2 className="text-xl font-black text-gray-800 dark:text-slate-200 mb-4 pb-2 border-b border-gray-100 dark:border-slate-800">
                {category}
              </h2>
              <div className="space-y-3">
                {activeTasks.filter(t => t.category === category).map(task => {
                  const isCompleted = completedTasks.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
                        isCompleted 
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' 
                          : 'bg-gray-50 dark:bg-slate-800/50 border-transparent hover:bg-gray-100 dark:hover:bg-slate-800'
                      } border`}
                    >
                      <div className={`${isCompleted ? 'text-emerald-500' : 'text-gray-400 dark:text-slate-500'}`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </div>
                      <span className={`flex-1 font-medium ${
                        isCompleted ? 'text-emerald-800 dark:text-emerald-300' : 'text-gray-700 dark:text-slate-300'
                      }`}>
                        {task.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/50 flex gap-4 items-start">
          <AlertCircle className="text-amber-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-1">মুহাসাবাহ কেন জরুরি?</h3>
            <p className="text-amber-700/80 dark:text-amber-500/80 text-sm leading-relaxed">
              হযরত উমর (রাঃ) বলেছেন, "তোমরা নিজেদের হিসাব নিজেরা গ্রহণ করো, এর পূর্বে যে তোমাদের হিসাব নেওয়া হবে। এবং তোমাদের আমলসমূহ ওজন করো, এর পূর্বে যে তা ওজন করা হবে।"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
