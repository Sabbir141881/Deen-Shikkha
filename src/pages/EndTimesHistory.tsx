import React from 'react';
import { ArrowLeft, Clock, AlertTriangle, ShieldAlert, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const END_TIMES_SIGNS = [
  {
    id: 1,
    title: 'ছোট আলামতসমূহ',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    items: [
      'ইলম (জ্ঞান) উঠে যাবে এবং মূর্খতা বৃদ্ধি পাবে।',
      'মদ্যপান ও ব্যভিচার বৃদ্ধি পাবে।',
      'সময় দ্রুত পার হবে।',
      'আমানতের খিয়ানত হবে।',
      'অযোগ্য ব্যক্তিদের হাতে নেতৃত্ব দেওয়া হবে।',
      'মসজিদ নিয়ে গর্ব করা হবে কিন্তু ইবাদতকারী কম হবে।',
      'উঁচু উঁচু দালানকোঠা নির্মাণের প্রতিযোগিতা হবে।',
      'হঠাৎ মৃত্যুর হার বেড়ে যাবে।'
    ]
  },
  {
    id: 2,
    title: 'বড় আলামতসমূহ',
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    items: [
      'ইমাম মাহদীর আগমন।',
      'দাজ্জালের আত্মপ্রকাশ।',
      'হযরত ঈসা (আঃ) এর আসমান থেকে অবতরণ।',
      'ইয়াজুজ-মাজুজের আবির্ভাব।',
      'পশ্চিম দিক থেকে সূর্যোদয়।',
      'দাব্বাতুল আরদ (একটি অদ্ভুত প্রাণী) এর বের হওয়া।',
      'তিনটি বড় ভূমিধস (পূর্বে, পশ্চিমে এবং আরব উপদ্বীপে)।',
      'ইয়েমেন থেকে একটি বিশাল আগুন বের হয়ে মানুষকে হাশরের ময়দানের দিকে তাড়িয়ে নিয়ে যাবে।'
    ]
  },
  {
    id: 3,
    title: 'ইমাম মাহদীর আগমন',
    icon: ShieldAlert,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    items: [
      'তার নাম হবে মুহাম্মদ এবং পিতার নাম হবে আব্দুল্লাহ।',
      'তিনি হযরত ফাতিমা (রাঃ) এর বংশধর হবেন।',
      'তিনি পৃথিবীতে ন্যায়বিচার প্রতিষ্ঠা করবেন, যেমনটি আগে জুলুম ও অত্যাচারে ভরে ছিল।',
      'তিনি ৭ বছর শাসন করবেন।',
      'তার শাসনামলে পৃথিবী ধন-সম্পদ ও বরকতে ভরে যাবে।'
    ]
  },
  {
    id: 4,
    title: 'দাজ্জালের ফিতনা',
    icon: Globe,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    items: [
      'দাজ্জাল হবে মানব ইতিহাসের সবচেয়ে বড় ফিতনা (পরীক্ষা)।',
      'তার এক চোখ অন্ধ হবে এবং কপালে "কাফির" লেখা থাকবে।',
      'সে নিজেকে ঈশ্বর দাবি করবে এবং অনেক অলৌকিক ক্ষমতা দেখাবে।',
      'মক্কা ও মদিনা ছাড়া পৃথিবীর সব জায়গায় সে প্রবেশ করবে।',
      'হযরত ঈসা (আঃ) তাকে ফিলিস্তিনের "লুদ" নামক স্থানে হত্যা করবেন।'
    ]
  }
];

export default function EndTimesHistory() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-6 px-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/ilm" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">শেষ জামানার ইতিহাস</h1>
            <p className="text-emerald-100 text-sm opacity-90">কিয়ামতের আলামত ও শেষ যুগের ঘটনাবলী</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            কুরআন ও সহিহ হাদিসের আলোকে শেষ জামানা বা কিয়ামতের পূর্ববর্তী সময়ের ঘটনাবলী অত্যন্ত গুরুত্বপূর্ণ। 
            মহানবী (সাঃ) উম্মতকে শেষ জামানার ফিতনা থেকে সতর্ক করেছেন এবং ঈমান রক্ষার উপায় বলে দিয়েছেন।
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {END_TIMES_SIGNS.map((section) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.id} 
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <div className={`p-3 rounded-xl ${section.bgColor} ${section.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.color.replace('text-', 'bg-')}`}></span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
