import React, { useState } from 'react';
import { BookOpen, Play, Pause, ChevronRight, GraduationCap, Volume2 } from 'lucide-react';

const ARABIC_LETTERS = [
  { char: 'ا', name: 'আলিফ', transliteration: 'Alif', description: 'বাংলা "আ" এর মতো উচ্চারণ। তবে শুরুতে আসলে স্বরবর্ণের মতো কাজ করে।' },
  { char: 'ب', name: 'বা', transliteration: 'Ba', description: 'বাংলা "ব" এর মতো উচ্চারণ। দুই ঠোঁট মিলিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ت', name: 'তা', transliteration: 'Ta', description: 'বাংলা "ত" এর মতো উচ্চারণ। জিহ্বার আগা ওপরের দাঁতের গোড়ায় লাগিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ث', name: 'ছা', transliteration: 'Tha', description: 'জিহ্বার আগা ওপরের দাঁতের আগার সাথে লাগিয়ে নরমভাবে "ছা" উচ্চারণ করতে হয়।' },
  { char: 'ج', name: 'জীম', transliteration: 'Jeem', description: 'বাংলা "জ" এর মতো উচ্চারণ। জিহ্বার মধ্যভাগ ওপরের তালুর সাথে লাগিয়ে শক্তভাবে উচ্চারণ করতে হয়।' },
  { char: 'ح', name: 'হা', transliteration: 'Ha', description: 'গলার মধ্যভাগ থেকে শ্লেষ্মাবিহীন "হা" উচ্চারণ করতে হয়। একটু চাপ দিয়ে বাতাস বের করতে হয়।' },
  { char: 'خ', name: 'খ', transliteration: 'Kha', description: 'গলার শেষ ভাগ (মুখের দিকে) থেকে একটু ঘর্ষণের সাথে "খ" উচ্চারণ করতে হয়।' },
  { char: 'د', name: 'দাল', transliteration: 'Dal', description: 'বাংলা "দ" এর মতো উচ্চারণ। জিহ্বার আগা ওপরের দাঁতের গোড়ায় লাগিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ذ', name: 'জাল', transliteration: 'Dhal', description: 'জিহ্বার আগা ওপরের দাঁতের আগার সাথে লাগিয়ে নরমভাবে "জাল" উচ্চারণ করতে হয়।' },
  { char: 'ر', name: 'রা', transliteration: 'Ra', description: 'বাংলা "র" এর মতো। তবে কখনো মোটা (পুর) এবং কখনো চিকন (বারীক) করে পড়তে হয়।' },
  { char: 'ز', name: 'ঝা', transliteration: 'Zay', description: 'দুই দাঁত মিলিয়ে জিহ্বার আগা দিয়ে শীস দেওয়ার মতো করে "ঝা" উচ্চারণ করতে হয়।' },
  { char: 'س', name: 'সীন', transliteration: 'Seen', description: 'বাংলা "স" এর মতো। শীস দিয়ে পাতলা করে উচ্চারণ করতে হয়।' },
  { char: 'ش', name: 'শীন', transliteration: 'Sheen', description: 'বাংলা "শ" এর মতো। জিহ্বার মধ্যভাগ ওপরের তালুর সাথে লাগিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ص', name: 'সদ', transliteration: 'Sad', description: 'মোটা করে "স" উচ্চারণ করতে হয়। মুখ গোল করে বাতাস পূর্ণ করে উচ্চারণ করতে হয়।' },
  { char: 'ض', name: 'দদ', transliteration: 'Dad', description: 'জিহ্বার পাশ ওপরের মাড়ির দাঁতের গোড়ায় লাগিয়ে মোটা করে "দ" এর মতো উচ্চারণ করতে হয়।' },
  { char: 'ط', name: 'ত', transliteration: 'Ta', description: 'মোটা করে "ত" উচ্চারণ করতে হয়। জিহ্বার আগা ওপরের দাঁতের গোড়ায় লাগিয়ে মুখ গোল করে উচ্চারণ করতে হয়।' },
  { char: 'ظ', name: 'জ', transliteration: 'Za', description: 'মোটা করে "জ" উচ্চারণ করতে হয়। জিহ্বার আগা ওপরের দাঁতের আগার সাথে লাগিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ع', name: 'আইন', transliteration: 'Ain', description: 'গলার মধ্যভাগ থেকে চাপ দিয়ে "আইন" উচ্চারণ করতে হয়।' },
  { char: 'غ', name: 'গাইন', transliteration: 'Ghain', description: 'গলার শেষ ভাগ থেকে "গ" এর মতো উচ্চারণ করতে হয়।' },
  { char: 'ف', name: 'ফা', transliteration: 'Fa', description: 'ওপরের দাঁত নিচের ঠোঁটের পেটে লাগিয়ে "ফা" উচ্চারণ করতে হয়।' },
  { char: 'ق', name: 'ক্বাফ', transliteration: 'Qaf', description: 'জিহ্বার গোড়া ওপরের তালুর সাথে লাগিয়ে মোটা করে "ক্ব" উচ্চারণ করতে হয়।' },
  { char: 'ك', name: 'কাফ', transliteration: 'Kaf', description: 'বাংলা "ক" এর মতো। জিহ্বার গোড়া থেকে একটু সামনে বাড়িয়ে উচ্চারণ করতে হয়।' },
  { char: 'ل', name: 'লাম', transliteration: 'Lam', description: 'বাংলা "ল" এর মতো উচ্চারণ।' },
  { char: 'm', name: 'মীম', transliteration: 'Meem', description: 'বাংলা "ম" এর মতো। দুই ঠোঁট মিলিয়ে উচ্চারণ করতে হয়।' },
  { char: 'ن', name: 'নুন', transliteration: 'Noon', description: 'বাংলা "ন" এর মতো উচ্চারণ।' },
  { char: 'ه', name: 'হা', transliteration: 'Ha', description: 'গলার শুরু থেকে স্বাভাবিকভাবে "হা" উচ্চারণ করতে হয়।' },
  { char: 'و', name: 'ওয়াও', transliteration: 'Waw', description: 'দুই ঠোঁট গোল করে "ওয়াও" উচ্চারণ করতে হয়।' },
  { char: 'ي', name: 'ইয়া', transliteration: 'Ya', description: 'বাংলা "ই" বা "য়" এর মতো উচ্চারণ।' },
];

const HARAKAT = [
  { name: 'ফাতহা (জবর)', symbol: 'َ', description: 'অক্ষরের ওপরে থাকে। "আ" কারের মতো উচ্চারণ হয়। যেমন: বা জবর = বা।' },
  { name: 'কাসরা (জের)', symbol: 'ِ', description: 'অক্ষরের নিচে থাকে। "ই" কারের মতো উচ্চারণ হয়। যেমন: বা জের = বি।' },
  { name: 'দাম্মা (পেশ)', symbol: 'ُ', description: 'অক্ষরের ওপরে থাকে। "উ" কারের মতো উচ্চারণ হয়। যেমন: বা পেশ = বু।' },
  { name: 'সুকুন (জজম)', symbol: 'ْ', description: 'অক্ষরের ওপর থাকলে সেই অক্ষরটি আগের অক্ষরের সাথে মিলিয়ে পড়তে হয়।' },
  { name: 'শাদ্দাহ (তাশদীদ)', symbol: 'ّ', description: 'অক্ষরটিকে দুইবার উচ্চারণ করতে হয়। প্রথমবার জজমসহ, দ্বিতীয়বার হরকতসহ।' },
];

const TAJWEED_RULES = [
  {
    title: 'ইদগাম (মিলিয়ে পড়া)',
    description: 'নুন সাকিন বা তানভীনের পরে ইদগামের ৬টি অক্ষরের কোনোটি আসলে, নুন সাকিনকে সেই অক্ষরের সাথে মিলিয়ে পড়তে হয়।',
    letters: 'ي, ر, م, ل, و, ن (ইয়ারমালুন)',
    example: 'مَن يَّقُولُ (মাই ইয়াকুলু)'
  },
  {
    title: 'ইqlab (পরিবর্তন করা)',
    description: 'নুন সাকিন বা তানভীনের পরে "বা" (ب) আসলে, নুন সাকিনকে "মীম" (م) দ্বারা পরিবর্তন করে গুন্নাহসহ পড়তে হয়।',
    letters: 'ب (বা)',
    example: 'مِنْ بَعْدِ (মিম বা\'দি)'
  },
  {
    title: 'ইজহার (স্পষ্ট করা)',
    description: 'নুন সাকিন বা তানভীনের পরে ইজহারের ৬টি অক্ষরের কোনোটি আসলে, গুন্নাহ ছাড়া স্পষ্ট করে পড়তে হয়।',
    letters: 'ء, ه, ع, ح, غ, خ (হালকি অক্ষর)',
    example: 'مَنْ آمَنَ (মান আমানা)'
  },
  {
    title: 'ইখফা (গোপন করা)',
    description: 'নুন সাকিন বা তানভীনের পরে ইখফার ১৫টি অক্ষরের কোনোটি আসলে, নাকের বাঁশিতে লুকিয়ে গুন্নাহসহ পড়তে হয়।',
    letters: 'ت, ث, ج, د, ذ, ز, س, ش, ص, ض, ط, ظ, ف, ق, ك',
    example: 'مِنْ شَرِّ (মিং শাররি)'
  }
];

const MAKHRAJ_RULES = [
  {
    title: 'হলক বা কণ্ঠনালী (১-৩)',
    description: 'কণ্ঠনালী থেকে ৬টি অক্ষর উচ্চারিত হয়।',
    points: [
      { location: 'কণ্ঠনালীর শুরু', letters: 'ء (হামজা), ه (হা)' },
      { location: 'কণ্ঠনালীর মধ্যভাগ', letters: 'ع (আইন), ح (হা)' },
      { location: 'কণ্ঠনালীর শেষভাগ', letters: 'غ (গাইন), خ (খা)' }
    ]
  },
  {
    title: 'জিহ্বা (৪-১০)',
    description: 'জিহ্বা থেকে ১৮টি অক্ষর উচ্চারিত হয়।',
    points: [
      { location: 'জিহ্বার গোড়া ও তালু', letters: 'ق (ক্বাফ), ك (কাফ)' },
      { location: 'জিহ্বার মধ্যভাগ ও তালু', letters: 'ج (জীম), ش (শীন), ي (ইয়া)' },
      { location: 'জিহ্বার পাশ ও মাড়ির দাঁত', letters: 'ض (দদ)' },
      { location: 'জিহ্বার আগা ও ওপরের দাঁতের গোড়া', letters: 'ل (লাম), ن (নুন), ر (রা)' },
      { location: 'জিহ্বার আগা ও ওপরের দাঁতের গোড়া', letters: 'ط (ত), د (দাল), ت (তা)' },
      { location: 'জিহ্বার আগা ও ওপরের দাঁতের আগা', letters: 'ظ (জ), ذ (জাল), ث (ছা)' },
      { location: 'জিহ্বার আগা ও নিচের দাঁতের আগা', letters: 'ص (সদ), س (সীন), ز (ঝা)' }
    ]
  },
  {
    title: 'ঠোঁট (১১-১২)',
    description: 'দুই ঠোঁট থেকে ৪টি অক্ষর উচ্চারিত হয়।',
    points: [
      { location: 'নিচের ঠোঁটের পেট ও ওপরের দাঁত', letters: 'ف (ফা)' },
      { location: 'দুই ঠোঁট থেকে', letters: 'ب (বা), م (মীম), و (ওয়াও)' }
    ]
  },
  {
    title: 'নাক (১৩)',
    description: 'নাকের বাঁশি থেকে গুন্নাহ উচ্চারিত হয়।',
    points: [
      { location: 'নাসিকা', letters: 'গুন্নাহ (নুন ও মীম মুশাদদাদ)' }
    ]
  }
];

const WAQF_RULES = [
  { symbol: 'م', meaning: 'অবশ্যই থামতে হবে', description: 'এখানে না থামলে অর্থ পরিবর্তন হয়ে যেতে পারে।' },
  { symbol: 'ط', meaning: 'থামা উত্তম', description: 'এখানে থামা ভালো, তবে না থামলেও ক্ষতি নেই।' },
  { symbol: 'ج', meaning: 'থামা জায়েজ', description: 'এখানে থামা বা না থামা উভয়ই সমান।' },
  { symbol: 'ز', meaning: 'না থামা উত্তম', description: 'এখানে থামা যায়, তবে মিলিয়ে পড়া ভালো।' },
  { symbol: 'لا', meaning: 'থামা যাবে না', description: 'এখানে থামা উচিত নয়, থামলে আগের শব্দ থেকে মিলিয়ে পড়তে হবে।' },
  { symbol: 'قلی', meaning: 'থামা ভালো', description: 'এখানে থামা উত্তম।' },
  { symbol: 'صلی', meaning: 'মিলিয়ে পড়া ভালো', description: 'এখানে না থেমে মিলিয়ে পড়া উত্তম।' }
];

const MADD_RULES = [
  {
    title: 'মদ্দে আসলি (স্বাভাবিক দীর্ঘস্বর)',
    description: 'এক আলিফ পরিমাণ টেনে পড়তে হয়।',
    example: 'بَا (বা), بِي (বি), بُو (বু)'
  },
  {
    title: 'মদ্দে মুত্তাসিল (যুক্ত দীর্ঘস্বর)',
    description: 'মদের অক্ষরের পরে একই শব্দে হামজা আসলে ৪ আলিফ টানতে হয়।',
    example: 'جَاءَ (জা-আ)'
  },
  {
    title: 'মদ্দে মুনফাসিল (বিচ্ছিন্ন দীর্ঘস্বর)',
    description: 'মদের অক্ষরের পরে পরের শব্দের শুরুতে হামজা আসলে ৩-৪ আলিফ টানতে হয়।',
    example: 'فِي أَنفُسِكُم (ফি আনফুসিকুম)'
  },
  {
    title: 'মদ্দে লাজিম (আবশ্যক দীর্ঘস্বর)',
    description: 'মদের অক্ষরের পরে জজম বা তাশদীদ থাকলে ৪ আলিফ টানতে হয়।',
    example: 'الضَّالِّينَ (আদ-দাল্লিন)'
  }
];

export default function QuranLearning() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'harakat' | 'tajweed' | 'makhraj' | 'waqf' | 'madd'>('alphabet');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <GraduationCap /> কুরআন শিক্ষা
        </h1>
        <p className="text-emerald-100 opacity-90">সহজ পদ্ধতিতে কুরআন শিখুন</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {['alphabet', 'harakat', 'tajweed', 'makhraj', 'waqf', 'madd'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              {tab === 'alphabet' && 'আরবি বর্ণমালা'}
              {tab === 'harakat' && 'হরকত ও চিহ্ন'}
              {tab === 'tajweed' && 'তাজবীদ'}
              {tab === 'makhraj' && 'মাখরাজ'}
              {tab === 'waqf' && 'ওয়াকফ'}
              {tab === 'madd' && 'মাদ'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'alphabet' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {ARABIC_LETTERS.map((letter, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center group hover:border-emerald-500 transition-colors">
                  <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 font-serif">{letter.char}</span>
                  <h3 className="font-bold text-gray-800 dark:text-white">{letter.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{letter.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'harakat' && (
            <div className="space-y-4">
              {HARAKAT.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-serif">
                    ب{item.symbol}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tajweed' && (
            <div className="space-y-4">
              {TAJWEED_RULES.map((rule, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{rule.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{rule.description}</p>
                  
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">অক্ষরসমূহ:</span>
                    <p className="font-medium text-gray-800 dark:text-white">{rule.letters}</p>
                  </div>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 block mb-1">উদাহরণ:</span>
                    <p className="text-lg font-serif text-gray-800 dark:text-white">{rule.example}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'makhraj' && (
            <div className="space-y-4">
              {MAKHRAJ_RULES.map((rule, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{rule.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{rule.description}</p>
                  <div className="space-y-3">
                    {rule.points.map((point, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{point.location}</span>
                        <span className="text-2xl font-serif text-emerald-600 dark:text-emerald-400 font-bold">{point.letters}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'waqf' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WAQF_RULES.map((rule, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-700 dark:text-emerald-300 font-serif shrink-0">
                    {rule.symbol}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">{rule.meaning}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'madd' && (
            <div className="space-y-4">
              {MADD_RULES.map((rule, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{rule.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{rule.description}</p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 block mb-1">উদাহরণ:</span>
                    <p className="text-lg font-serif text-gray-800 dark:text-white">{rule.example}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
