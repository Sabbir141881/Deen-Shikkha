import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Flame, CheckCircle, AlertCircle, Star, ShieldAlert, ArrowRight, BookOpen } from 'lucide-react';

const jannahLevels = [
  { name: 'জান্নাতুল ফিরদাউস', desc: 'সর্বোচ্চ ও সর্বশ্রেষ্ঠ জান্নাত। এর ছাদ হলো আল্লাহর আরশ।' },
  { name: 'জান্নাতু আদন', desc: 'চিরস্থায়ী বসবাসের বাগান।' },
  { name: 'জান্নাতুন নাঈম', desc: 'অফুরন্ত নিয়ামত ও সুখ-স্বাচ্ছন্দ্যের কানন।' },
  { name: 'জান্নাতুল মাওয়া', desc: 'শহীদ ও মুমিনদের আশ্রয়স্থল।' },
  { name: 'দারুস সালাম', desc: 'শান্তি ও নিরাপত্তার গৃহ।' },
  { name: 'দারুল মুকামাহ', desc: 'চিরস্থায়ী আবাসস্থল।' },
  { name: 'আল-মাকামুল আমিন', desc: 'নিরাপদ স্থান।' },
  { name: 'জান্নাতুল খুলদ', desc: 'চিরস্থায়ী বাগান।' }
];

const jahannamLevels = [
  { name: 'জাহান্নাম', desc: 'সবচেয়ে উপরের স্তর, যেখানে গুনাহগার মুমিনদের শাস্তি দেওয়া হবে।' },
  { name: 'লাযা', desc: 'লেলিহান শিখা, যা চামড়া খসিয়ে দেবে।' },
  { name: 'হুতামাহ', desc: 'চূর্ণ-বিচূর্ণকারী আগুন, যা হৃদয় পর্যন্ত পৌঁছে যাবে।' },
  { name: 'সায়ীর', desc: 'প্রজ্বলিত অগ্নিশিখা।' },
  { name: 'সাকার', desc: 'তীব্র উত্তপ্ত আগুন, যা চামড়া ঝলসে দেবে।' },
  { name: 'জাহীম', desc: 'ভয়ানক উত্তপ্ত আগুন।' },
  { name: 'হাবিয়াহ', desc: 'সবচেয়ে নিচের স্তর, গভীর গহ্বর। মুনাফিকদের স্থান।' }
];

const jannahDeeds = [
  'ঈমান আনা ও সৎকর্ম করা',
  'পাঁচ ওয়াক্ত নামাজ কায়েম করা',
  'রমজানের রোজা রাখা',
  'যাকাত প্রদান করা',
  'সামর্থ্য থাকলে হজ্ব করা',
  'পিতামাতার সাথে সদ্ব্যবহার করা',
  'আত্মীয়তার সম্পর্ক বজায় রাখা',
  'সত্য কথা বলা ও আমানত রক্ষা করা',
  'ক্ষমা করা ও রাগ নিয়ন্ত্রণ করা',
  'আল্লাহর রাস্তায় দান করা'
];

const jahannamDeeds = [
  'শিরক (আল্লাহর সাথে অংশীদার স্থাপন) করা',
  'নামাজ ত্যাগ করা',
  'যাকাত না দেওয়া',
  'পিতামাতার অবাধ্য হওয়া',
  'মিথ্যা বলা ও গীবত করা',
  'সুদ খাওয়া ও ঘুষ নেওয়া',
  'এতিমের সম্পদ আত্মসাৎ করা',
  'যিনা (ব্যভিচার) করা',
  'অহংকার করা',
  'আত্মহত্যা করা ও অন্যায়ভাবে মানুষ হত্যা করা'
];

export default function JannahJahannam() {
  const [activeTab, setActiveTab] = useState<'jannah' | 'jahannam'>('jannah');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-4">পরকালের অনন্ত জীবন</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            কুরআন ও হাদিসের আলোকে চিরস্থায়ী সুখের স্থান জান্নাত এবং শাস্তির স্থান জাহান্নামের বিস্তারিত বিবরণ।
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 inline-flex relative">
            <button
              onClick={() => setActiveTab('jannah')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-colors ${
                activeTab === 'jannah' ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Cloud size={24} className={activeTab === 'jannah' ? 'text-emerald-500' : ''} />
              জান্নাত
            </button>
            <button
              onClick={() => setActiveTab('jahannam')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-colors ${
                activeTab === 'jahannam' ? 'text-red-900 dark:text-red-100' : 'text-slate-500 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Flame size={24} className={activeTab === 'jahannam' ? 'text-red-500' : ''} />
              জাহান্নাম
            </button>
            
            {/* Animated Background Pill */}
            <motion.div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl ${
                activeTab === 'jannah' ? 'bg-emerald-100 dark:bg-emerald-900/50 left-1.5' : 'bg-red-100 dark:bg-red-900/50 right-1.5'
              }`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'jannah' ? (
            <motion.div
              key="jannah"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Jannah Hero */}
              <div className="bg-emerald-600 dark:bg-emerald-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-emerald-900/10">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Cloud size={300} />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
                    <Star className="text-emerald-300" size={36} /> জান্নাত: চিরস্থায়ী সুখের ঠিকানা
                  </h2>
                  <p className="text-emerald-50 text-lg leading-relaxed mb-6">
                    জান্নাত হলো এমন এক স্থান যা কোনো চোখ দেখেনি, কোনো কান শোনেনি এবং কোনো মানুষের হৃদয়ে কল্পনাও করা হয়নি। সেখানে থাকবে দুধ, মধু, সুমিষ্ট পানি ও পবিত্র সুরার নহর।
                  </p>
                  <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-emerald-100 font-medium">
                    "নিশ্চয়ই যারা ঈমান এনেছে এবং সৎকর্ম করেছে, তাদের আপ্যায়নের জন্য রয়েছে জান্নাতুল ফিরদাউস।" <br/>
                    <span className="text-sm mt-2 block opacity-80">— সূরা আল-কাহফ, ১০৭</span>
                  </blockquote>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Jannah Levels */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-emerald-100 dark:border-emerald-900/30">
                  <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 flex items-center gap-2">
                    <LayersIcon /> জান্নাতের স্তরসমূহ
                  </h3>
                  <div className="space-y-4">
                    {jannahLevels.map((level, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                        <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">{level.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{level.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Jannah Features */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-emerald-100 dark:border-emerald-900/30">
                    <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 flex items-center gap-2">
                      <BookOpen className="text-emerald-500" /> জান্নাতের নিয়ামতসমূহ
                    </h3>
                    <ul className="space-y-4">
                      <FeatureItem icon={CheckCircle} text="আল্লাহর দিদার (দর্শন) লাভ, যা হবে জান্নাতের সর্বশ্রেষ্ঠ নিয়ামত।" color="text-emerald-600 dark:text-emerald-400" />
                      <FeatureItem icon={CheckCircle} text="চিরস্থায়ী যৌবন, কেউ কখনো বৃদ্ধ হবে না বা অসুস্থ হবে না।" color="text-emerald-600 dark:text-emerald-400" />
                      <FeatureItem icon={CheckCircle} text="সুউচ্চ প্রাসাদ, যা সোনা ও রূপার ইট এবং মেশকের গাঁথুনি দিয়ে তৈরি।" color="text-emerald-600 dark:text-emerald-400" />
                      <FeatureItem icon={CheckCircle} text="তূবা নামক বিশাল বৃক্ষ, যার ছায়া অতিক্রম করতে ১০০ বছর লাগবে।" color="text-emerald-600 dark:text-emerald-400" />
                      <FeatureItem icon={CheckCircle} text="পবিত্র সঙ্গিনী (হুর) এবং দুনিয়ার স্ত্রীরা হবেন হুরদের সর্দারনী।" color="text-emerald-600 dark:text-emerald-400" />
                      <FeatureItem icon={CheckCircle} text="সেখানে কোনো দুঃখ, কষ্ট, ক্লান্তি, মলমূত্র বা থুথু থাকবে না।" color="text-emerald-600 dark:text-emerald-400" />
                    </ul>
                  </div>

                  {/* Deeds for Jannah */}
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800/50">
                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">যেসব আমলে জান্নাত মেলে</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {jannahDeeds.map((deed, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium">
                          <ArrowRight size={16} className="text-emerald-500 shrink-0" />
                          <span>{deed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="jahannam"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Jahannam Hero */}
              <div className="bg-red-700 dark:bg-red-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-red-900/10">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Flame size={300} />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
                    <ShieldAlert className="text-red-300" size={36} /> জাহান্নাম: যন্ত্রণাদায়ক শাস্তির স্থান
                  </h2>
                  <p className="text-red-50 text-lg leading-relaxed mb-6">
                    জাহান্নাম হলো আগুনের গহ্বর, যার উত্তাপ পৃথিবীর আগুনের চেয়ে ৭০ গুণ বেশি। সেখানে পাপীদের জন্য রয়েছে ফুটন্ত পানি, পুঁজ, কাঁটাযুক্ত ফল এবং অসহনীয় শাস্তি।
                  </p>
                  <blockquote className="border-l-4 border-red-400 pl-4 italic text-red-100 font-medium">
                    "যারা আমার আয়াতসমূহকে অস্বীকার করেছে, শীঘ্রই আমি তাদেরকে আগুনে প্রবেশ করাব। যখনই তাদের চামড়া পুড়ে যাবে, তখনই আমি তার স্থলে নতুন চামড়া সৃষ্টি করব, যাতে তারা শাস্তি ভোগ করতে থাকে।" <br/>
                    <span className="text-sm mt-2 block opacity-80">— সূরা আন-নিসা, ৫৬</span>
                  </blockquote>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Jahannam Levels */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-red-100 dark:border-red-900/30">
                  <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-2">
                    <LayersIcon /> জাহান্নামের স্তরসমূহ
                  </h3>
                  <div className="space-y-4">
                    {jahannamLevels.map((level, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">{level.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{level.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Jahannam Features */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-red-100 dark:border-red-900/30">
                    <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-2">
                      <BookOpen className="text-red-500" /> জাহান্নামের ভয়াবহতা
                    </h3>
                    <ul className="space-y-4">
                      <FeatureItem icon={AlertCircle} text="খাবার হিসেবে দেওয়া হবে 'যাক্কুম' নামক বিষাক্ত ও কাঁটাযুক্ত গাছ।" color="text-red-600 dark:text-red-400" />
                      <FeatureItem icon={AlertCircle} text="পানীয় হিসেবে দেওয়া হবে ফুটন্ত পানি (হামীম) এবং পুঁজ (গাসসাক)।" color="text-red-600 dark:text-red-400" />
                      <FeatureItem icon={AlertCircle} text="জাহান্নামীদের বিশাল আকৃতির শিকল দিয়ে বেঁধে রাখা হবে।" color="text-red-600 dark:text-red-400" />
                      <FeatureItem icon={AlertCircle} text="বিশাল আকৃতির সাপ ও বিচ্ছু দংশন করবে, যার বিষের যন্ত্রণা ৪০ বছর থাকবে।" color="text-red-600 dark:text-red-400" />
                      <FeatureItem icon={AlertCircle} text="তারা মৃত্যু কামনা করবে কিন্তু মৃত্যু আসবে না, শাস্তি চলতেই থাকবে।" color="text-red-600 dark:text-red-400" />
                      <FeatureItem icon={AlertCircle} text="জাহান্নামের আগুন তাদের চেহারা ঝলসে দেবে এবং ঠোঁট কুঁচকে যাবে।" color="text-red-600 dark:text-red-400" />
                    </ul>
                  </div>

                  {/* Deeds for Jahannam */}
                  <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-200 dark:border-red-800/50">
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4">যেসব আমলে জাহান্নাম অবধারিত</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {jahannamDeeds.map((deed, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium">
                          <ArrowRight size={16} className="text-red-500 shrink-0" />
                          <span>{deed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, text, color }: any) {
  return (
    <li className="flex items-start gap-3">
      <Icon className={`${color} shrink-0 mt-1`} size={20} />
      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{text}</span>
    </li>
  );
}

function LayersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 12 12 17 22 12"/>
      <polyline points="2 17 12 22 22 17"/>
    </svg>
  );
}
