import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Bell, ChevronRight, Star } from 'lucide-react';

const IMPORTANT_DAYS = [
  {
    date: '১ মহররম',
    title: 'হিজরি নববর্ষ',
    description: 'হিজরি সনের প্রথম দিন। মহানবী (সা.) এর মক্কা থেকে মদিনায় হিজরতের ঐতিহাসিক ঘটনাকে কেন্দ্র করে এই ক্যালেন্ডারের সূচনা হয়। এটি মুসলমানদের জন্য আত্মশুদ্ধির একটি নতুন সুযোগ।'
  },
  {
    date: '১০ মহররম',
    title: 'আশুরা',
    description: 'কারবালার মর্মান্তিক ঘটনা, মুসা (আ.) এর ফেরাউনের হাত থেকে মুক্তি এবং অন্যান্য অনেক ঐতিহাসিক ঘটনার দিন। এই দিনে রোজা রাখা অত্যন্ত সওয়াবের এবং এটি পূর্বের এক বছরের গুনাহ মাফ করে দেয়।'
  },
  {
    date: '১২ রবিউল আউয়াল',
    title: 'ঈদে মিলাদুন্নবী',
    description: 'সর্বশ্রেষ্ঠ ও সর্বশেষ নবী হযরত মুহাম্মদ (সা.) এর জন্ম ও ওফাত দিবস। এই দিনে তাঁর পবিত্র জীবন, আদর্শ ও সুন্নাহ নিয়ে আলোচনা করা হয় এবং তাঁর প্রতি অধিক দরুদ পাঠ করা হয়।'
  },
  {
    date: '২৭ রজব',
    title: 'শবে মেরাজ',
    description: 'মহানবী (সা.) এর সশরীরে ঊর্ধ্বাকাশে গমন এবং মহান আল্লাহর সাথে সাক্ষাতের রজনী। এই রাতেই মুসলমানদের জন্য ৫ ওয়াক্ত নামাজ ফরজ করা হয়।'
  },
  {
    date: '১৫ শাবান',
    title: 'শবে বরাত',
    description: 'ভাগ্য রজনী বা মুক্তির রাত। হাদিস অনুযায়ী, এই রাতে আল্লাহ তায়ালা অসংখ্য বান্দাকে ক্ষমা করেন এবং পরবর্তী বছরের জন্য রিযিক ও তাকদির নির্ধারণ করেন।'
  },
  {
    date: '১ রমজান',
    title: 'রমজান মাসের শুরু',
    description: 'রহমত, মাগফিরাত ও নাজাতের মাস এবং রোজা রাখার সূচনা। এই মাসে পবিত্র কুরআন অবতীর্ণ হয়েছে এবং প্রতিটি নেক আমলের সওয়াব বহুগুণে বৃদ্ধি পায়।'
  },
  {
    date: '১৭ রমজান',
    title: 'ঐতিহাসিক বদর দিবস',
    description: 'ইসলামের প্রথম ঐতিহাসিক যুদ্ধ "বদর যুদ্ধ" সংঘটিত হওয়ার দিন। মাত্র ৩১৩ জন সাহাবী নিয়ে মুসলমানরা বিশাল কুরাইশ বাহিনীর বিরুদ্ধে অভাবনীয় বিজয় লাভ করে।'
  },
  {
    date: '২০ রমজান',
    title: 'মক্কা বিজয়',
    description: 'মহানবী (সা.) এর নেতৃত্বে বিনা রক্তপাতে মক্কা বিজয়ের দিন। এই দিন কাবা ঘরকে মূর্তি থেকে পবিত্র করা হয় এবং ইসলামের চূড়ান্ত বিজয় সূচিত হয়।'
  },
  {
    date: '২৭ রমজান (সম্ভাব্য)',
    title: 'শবে কদর',
    description: 'হাজার মাসের চেয়েও উত্তম রজনী। এই রাতে পবিত্র কুরআন অবতীর্ণ হয়। এই রাতের ইবাদত ৮৩ বছর ৪ মাসের ইবাদতের চেয়েও উত্তম।'
  },
  {
    date: '১ শাওয়াল',
    title: 'ঈদুল ফিতর',
    description: 'দীর্ঘ এক মাস সিয়াম সাধনার পর মুসলমানদের অন্যতম প্রধান ধর্মীয় উৎসব। এই দিনে সদকাতুল ফিতর আদায় করা এবং আনন্দ উদযাপনের সাথে ঈদের নামাজ পড়া হয়।'
  },
  {
    date: '৮ জিলহজ',
    title: 'হজের সূচনা (ইয়াওমুত তারবিয়া)',
    description: 'মক্কায় পবিত্র হজ পালনের আনুষ্ঠানিকতা শুরু। হাজীরা মিনা অভিমুখে যাত্রা করেন এবং সেখানে অবস্থান করে ইবাদতে মশগুল হন।'
  },
  {
    date: '৯ জিলহজ',
    title: 'পবিত্র আরাফাহ দিবস',
    description: 'হজের মূল দিন। আরাফাতের ময়দানে হাজীদের অবস্থান এবং ক্ষমা প্রার্থনার দিন। যারা হজে যাননি তাদের জন্য এই দিনে রোজা রাখা অত্যন্ত সওয়াবের (আগের ও পরের এক বছরের গুনাহ মাফ হয়)।'
  },
  {
    date: '১০ জিলহজ',
    title: 'ঈদুল আজহা',
    description: 'ত্যাগের উৎসব বা কোরবানির ঈদ। হযরত ইব্রাহিম (আ.) এর মহান ত্যাগের স্মরণে পশু কোরবানি করা হয় এবং ঈদের নামাজ আদায় করা হয়।'
  },
  {
    date: '১১, ১২, ১৩ জিলহজ',
    title: 'আইয়ামে তাশরিক',
    description: 'মিনায় অবস্থান এবং জামারায় (শয়তানের প্রতীক) পাথর নিক্ষেপ করার দিন। এই দিনগুলোতে প্রত্যেক ফরজ নামাজের পর তাকবিরে তাশরিক পাঠ করা ওয়াজিব।'
  },
  {
    date: 'প্রতি শুক্রবার',
    title: 'জুমাবার (সাপ্তাহিক ঈদ)',
    description: 'সপ্তাহের শ্রেষ্ঠ দিন এবং মুসলমানদের সাপ্তাহিক ঈদের দিন। এই দিনে জুমার নামাজ আদায় করা হয়, যা যোহরের নামাজের স্থলাভিষিক্ত এবং এর বিশেষ ফজিলত রয়েছে।'
  }
];

export default function ImportantDays() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-4">
            <Bell size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">গুরুত্বপূর্ণ দিনসমূহ</h1>
          <p className="text-slate-600 dark:text-slate-400">ইসলামের ইতিহাসের তাৎপর্যপূর্ণ দিন ও রজনী</p>
        </div>

        <div className="space-y-4">
          {IMPORTANT_DAYS.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-xl p-3 flex flex-col items-center justify-center w-24 h-24 text-center">
                    <Calendar className="w-6 h-6 text-emerald-500 mb-1" />
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 leading-tight">
                      {day.date}
                    </span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{day.title}</h3>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    {day.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
