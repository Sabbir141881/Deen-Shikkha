import React, { useState } from 'react';
import { UserCheck, Droplets, Clock, List, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const WUDU_STEPS = [
  { step: 1, title: 'নিয়ত করা', description: 'মনে মনে ওজুর নিয়ত করা এবং বিসমিল্লাহ বলা।' },
  { step: 2, title: 'হাত ধোয়া', description: 'উভয় হাতের কবজি পর্যন্ত তিনবার ধোয়া।' },
  { step: 3, title: 'কুলি করা', description: 'ডান হাতে পানি নিয়ে তিনবার কুলি করা।' },
  { step: 4, title: 'নাক পরিষ্কার করা', description: 'নাকে পানি দিয়ে তিনবার পরিষ্কার করা।' },
  { step: 5, title: 'মুখমন্ডল ধোয়া', description: 'কপালের শুরু থেকে থুতনি এবং এক কানের লতি থেকে অন্য কানের লতি পর্যন্ত তিনবার ধোয়া।' },
  { step: 6, title: 'হাত ধোয়া (কনুইসহ)', description: 'প্রথমে ডান ও পরে বাম হাত কনুইসহ তিনবার ধোয়া।' },
  { step: 7, title: 'মাথা মাসাহ করা', description: 'ভেজা হাতে একবার মাথা মাসাহ করা।' },
  { step: 8, title: 'পা ধোয়া', description: 'প্রথমে ডান ও পরে বাম পা গোড়ালি পর্যন্ত তিনবার ধোয়া।' },
];

const PRAYER_RAKATS = [
  { name: 'ফজর', sunnah: 2, fard: 2, total: 4 },
  { name: 'জোহর', sunnah: 4, fard: 4, sunnah2: 2, nafl: 2, total: 12 },
  { name: 'আছর', sunnah: 4, fard: 4, total: 8 },
  { name: 'মাগরিব', fard: 3, sunnah: 2, nafl: 2, total: 7 },
  { name: 'এশা', sunnah: 4, fard: 4, sunnah2: 2, witr: 3, nafl: 2, total: 15 },
];

const PRAYER_STEPS = [
  { title: 'তাকবীরে তাহরীমা', description: 'কিবলামুখী হয়ে দাঁড়িয়ে "আল্লাহু আকবার" বলে হাত বাঁধা।' },
  { title: 'সানা পাঠ', description: 'সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা...' },
  { title: 'সূরা ফাতিহা ও অন্য সূরা', description: 'সূরা ফাতিহা পাঠ করা এবং কুরআনের অন্য কোনো সূরা বা আয়াত মিলানো।' },
  { title: 'রুকু', description: '"আল্লাহু আকবার" বলে রুকুতে যাওয়া এবং "সুবহানা রাব্বিয়াল আজিম" ৩ বার বলা।' },
  { title: 'রুকু থেকে উঠা', description: '"সামিয়াল্লাহু লিমান হামিদাহ" বলে সোজা হয়ে দাঁড়ানো এবং "রাব্বানা লাকাল হামদ" বলা।' },
  { title: 'সিজদা', description: '"আল্লাহু আকবার" বলে সিজদায় যাওয়া এবং "সুবহানা রাব্বিয়াল আলা" ৩ বার বলা।' },
  { title: 'দুই সিজদার মাঝের বৈঠক', description: '"আল্লাহু আকবার" বলে উঠে বসা এবং "আল্লাহুম্মাগফিরলি..." দোয়া পড়া।' },
  { title: 'দ্বিতীয় সিজদা', description: 'আবার সিজদায় গিয়ে তাসবীহ পাঠ করা।' },
  { title: 'তাশাহহুদ (আত্তাহিয়াতু)', description: 'শেষ বৈঠকে বসে তাশাহহুদ, দরুদ ও দোয়া মাসুরা পাঠ করা।' },
  { title: 'সালাম', description: 'প্রথমে ডানে ও পরে বামে "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ" বলে সালাম ফিরানো।' },
];

const PRAYER_CONDITIONS = [
  {
    title: 'নামাজের শর্তাবলী (শারায়েত)',
    description: 'নামাজ শুরু করার আগে ৭টি কাজ ফরজ। এগুলোকে নামাজের শর্ত বা শারায়েত বলা হয়।',
    items: [
      '১. শরীর পবিত্র হওয়া।',
      '২. কাপড় পবিত্র হওয়া।',
      '৩. নামাজের জায়গা পবিত্র হওয়া।',
      '৪. সতর ঢাকা (পুরুষের নাভি থেকে হাঁটু, নারীর মুখমন্ডল ও হাতের কবজি বাদে সমস্ত শরীর)।',
      '৫. কিবলামুখী হওয়া।',
      '৬. ওয়াক্ত মত নামাজ পড়া।',
      '৭. নামাজের নিয়ত করা।'
    ]
  },
  {
    title: 'নামাজের আরকান',
    description: 'নামাজের ভেতরে ৬টি কাজ ফরজ। এগুলোকে নামাজের আরকান বলা হয়।',
    items: [
      '১. তাকবীরে তাহরীমা (আল্লাহু আকবার) বলা।',
      '২. দাঁড়িয়ে নামাজ পড়া (কিয়াম করা)।',
      '৩. কিরাত পড়া (কুরআন তিলাওয়াত করা)।',
      '৪. রুকু করা।',
      '৫. দুই সিজদা করা।',
      '৬. শেষ বৈঠকে বসা।'
    ]
  }
];

const WAJIB_SUNNAH = [
  {
    title: 'নামাজের ওয়াজিবসমূহ',
    description: 'নামাজের ওয়াজিব ১৪টি। এর কোনো একটি ভুলবশত ছুটে গেলে সাহু সিজদা দিতে হয়।',
    items: [
      '১. সূরা ফাতিহা পড়া।',
      '২. সূরা ফাতিহার সাথে অন্য সূরা মিলানো।',
      '৩. রুকু ও সিজদায় দেরি করা (ধীরস্থিরভাবে আদায় করা)।',
      '৪. রুকু থেকে সোজা হয়ে দাঁড়ানো।',
      '৫. দুই সিজদার মাঝখানে সোজা হয়ে বসা।',
      '৬. প্রথম বৈঠক (তিন বা চার রাকাত বিশিষ্ট নামাজে)।',
      '৭. উভয় বৈঠকে তাশাহহুদ (আত্তাহিয়াতু) পড়া।',
      '৮. ইমামের জন্য উচ্চস্বরে বা নিচুস্বরে কিরাত পড়া।',
      '৯. বিতর নামাজে দোয়া কুনুত পড়া।',
      '১০. দুই ঈদের নামাজে অতিরিক্ত তাকবীর বলা।',
      '১১. তারতীব ঠিক রাখা।',
      '১২. আরকানগুলো পর্যায়ক্রমে আদায় করা।',
      '১৩. সালামের মাধ্যমে নামাজ শেষ করা।',
      '১৪. ইমামের অনুসরণ করা।'
    ]
  },
  {
    title: 'নামাজের সুন্নাতসমূহ',
    description: 'নামাজে অনেকগুলো সুন্নাত রয়েছে। এর মধ্যে কয়েকটি উল্লেখযোগ্য:',
    items: [
      '১. তাকবীরে তাহরীমার সময় হাত উঠানো।',
      '২. হাত বাঁধার নিয়ম (পুরুষ নাভির নিচে, নারী বুকের ওপর)।',
      '৩. সানা পড়া।',
      '৪. আউযুবিল্লাহ ও বিসমিল্লাহ পড়া।',
      '৫. আমিন বলা।',
      '৬. রুকু ও সিজদার তাসবীহ পড়া।',
      '৭. রুকু থেকে উঠার সময় "সামিয়াল্লাহু..." ও "রাব্বানা..." বলা।',
      '৮. বৈঠকে দরুদ ও দোয়া মাসুরা পড়া।'
    ]
  }
];

const NULLIFIERS = [
  {
    title: 'নামাজ ভঙ্গের কারণ',
    description: 'নিচের কাজগুলো করলে নামাজ ভেঙে যায় এবং পুনরায় পড়তে হয়।',
    items: [
      '১. নামাজে অশুদ্ধ পড়া (অর্থ পরিবর্তন হয়ে গেলে)।',
      '২. নামাজের ভেতরে কথা বলা।',
      '৩. কোনো লোককে সালাম দেওয়া বা সালামের উত্তর দেওয়া।',
      '৪. আলহামদুলিল্লাহর জবাবে ইয়ারহামুকাল্লাহ বলা।',
      '৫. বিনা ওজরে কাশি দেওয়া।',
      '৬. আমলে কাসীর করা (এমন কাজ করা যাতে মনে হয় সে নামাজ পড়ছে না)।',
      '৭. কিবলা থেকে বুক ঘুরে যাওয়া।',
      '৮. সতর খুলে যাওয়া।',
      '৯. নাপাক জায়গায় সিজদা করা।',
      '১০. দুনিয়াবী কোনো কারণে কান্না করা।',
      '১১. তিন তাসবীহ পরিমাণ সময় সতর খোলা থাকা।',
      '১২. মুক্তাদি ছাড়া অন্য কারো লোকমা (ভুল সংশোধন) নেওয়া।',
      '১৩. হাসির শব্দ করে হাসা।',
      '১৪. ইমামের আগে কোনো রুকন আদায় করা।',
      '১৫. ওজু ভেঙে যাওয়া।'
    ]
  }
];

export default function PrayerLearning() {
  const [activeTab, setActiveTab] = useState<'wudu' | 'rakat' | 'steps' | 'conditions' | 'wajib' | 'nullifiers'>('wudu');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <UserCheck /> নামায শিক্ষা
        </h1>
        <p className="text-emerald-100 opacity-90">সহীহ পদ্ধতিতে নামায আদায় শিখুন</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {['wudu', 'rakat', 'steps', 'conditions', 'wajib', 'nullifiers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              {tab === 'wudu' && 'ওজুর নিয়ম'}
              {tab === 'rakat' && 'রাকাত সংখ্যা'}
              {tab === 'steps' && 'নামাযের নিয়ম'}
              {tab === 'conditions' && 'শর্ত ও রুকন'}
              {tab === 'wajib' && 'ওয়াজিব ও সুন্নাত'}
              {tab === 'nullifiers' && 'নামাজ ভঙ্গের কারণ'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'wudu' && (
            <div className="space-y-4">
              {WUDU_STEPS.map((step, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rakat' && (
            <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200">
                    <th className="p-4 font-bold">ওয়াক্ত</th>
                    <th className="p-4 font-bold">সুন্নাত (মুক্কাদা)</th>
                    <th className="p-4 font-bold">ফরজ</th>
                    <th className="p-4 font-bold">সুন্নাত/নফল</th>
                    <th className="p-4 font-bold">বিতর</th>
                    <th className="p-4 font-bold">মোট</th>
                  </tr>
                </thead>
                <tbody>
                  {PRAYER_RAKATS.map((prayer, index) => (
                    <tr key={index} className="border-t border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-bold text-gray-800 dark:text-white">{prayer.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{prayer.sunnah || '-'}</td>
                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{prayer.fard}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">
                        {prayer.sunnah2 ? `${prayer.sunnah2} (সুন্নাত)` : ''}
                        {prayer.sunnah2 && prayer.nafl ? ' + ' : ''}
                        {prayer.nafl ? `${prayer.nafl} (নফল)` : ''}
                        {!prayer.sunnah2 && !prayer.nafl ? '-' : ''}
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{prayer.witr || '-'}</td>
                      <td className="p-4 font-bold text-gray-800 dark:text-white">{prayer.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-4">
              {PRAYER_STEPS.map((step, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -mr-8 -mt-8"></div>
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 relative z-10">{index + 1}. {step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 relative z-10">{step.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'conditions' && (
            <div className="space-y-6">
              {PRAYER_CONDITIONS.map((section, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{section.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wajib' && (
            <div className="space-y-6">
              {WAJIB_SUNNAH.map((section, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{section.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'nullifiers' && (
            <div className="space-y-6">
              {NULLIFIERS.map((section, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{section.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
