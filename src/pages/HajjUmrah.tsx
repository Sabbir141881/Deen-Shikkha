import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Layers, Compass, Map, HeartHandshake } from 'lucide-react';

const TABS = [
  { id: 'intro', label: 'প্রাথমিক ধারণা', icon: Info },
  { id: 'types', label: 'প্রকারভেদ', icon: Layers },
  { id: 'umrah', label: 'উমরাহ গাইড', icon: Compass },
  { id: 'hajj', label: 'হজ্ব গাইড', icon: Map },
  { id: 'duas', label: 'দোয়া সমূহ', icon: HeartHandshake },
];

const CONTENT: Record<string, React.ReactNode> = {
  intro: (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-3">হজ্ব ও উমরাহ কী?</h3>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
          <strong>হজ্ব:</strong> ইসলামি শরিয়তের পরিভাষায়, নির্দিষ্ট দিনগুলোতে (৮-১২ জিলহজ) নির্ধারিত পদ্ধতিতে বায়তুল্লাহ (কাবা শরীফ) ও সংশ্লিষ্ট স্থানসমূহ যিয়ারত করাকে হজ্ব বলে। এটি ইসলামের পঞ্চম স্তম্ভ এবং সামর্থ্যবান ব্যক্তির উপর জীবনে একবার ফরজ।
        </p>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          <strong>উমরাহ:</strong> বছরের যেকোনো সময় ইহরাম বেঁধে কাবা শরীফ তাওয়াফ করা এবং সাফা-মারওয়া সাঈ করাকে উমরাহ বলে। এটি সুন্নাতে মুয়াক্কাদাহ বা নফল ইবাদত।
        </p>
      </div>
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/50">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-3">ফজিলত</h3>
        <blockquote className="border-l-4 border-emerald-500 pl-4 text-gray-700 dark:text-slate-300 italic">
          "মাবরুর (কবুল) হজ্বের প্রতিদান জান্নাত ছাড়া আর কিছুই নয়। আর এক উমরাহ থেকে আরেক উমরাহ এর মধ্যবর্তী সময়ের গুনাহের কাফফারা স্বরূপ।" <br/>
          <span className="text-sm font-semibold mt-2 block">- সহীহ বুখারী ও মুসলিম</span>
        </blockquote>
      </div>
    </div>
  ),
  types: (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">১. হজ্জে তামাত্তু (সবচেয়ে উত্তম)</h3>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          হজ্বের মাসসমূহে (শাওয়াল, জিলকদ, জিলহজ) প্রথমে উমরার ইহরাম বেঁধে উমরাহ সম্পন্ন করে হালাল হয়ে যাওয়া। এরপর ৮ জিলহজ মক্কা থেকে নতুন করে হজ্বের ইহরাম বাঁধা। বাংলাদেশ থেকে যাওয়া বেশিরভাগ হাজি এই হজ্ব করে থাকেন।
        </p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">২. হজ্জে কিরান</h3>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          একই সাথে হজ্ব ও উমরার নিয়তে ইহরাম বাঁধা। উমরাহ শেষ করে ইহরাম খোলা যায় না, একই ইহরামে হজ্ব সম্পন্ন করতে হয়।
        </p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">৩. হজ্জে ইফরাদ</h3>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
          মিকাত থেকে শুধুমাত্র হজ্বের নিয়তে ইহরাম বাঁধা। এতে উমরাহ করা হয় না। মক্কাবাসীদের জন্য এই হজ্ব।
        </p>
      </div>
    </div>
  ),
  umrah: (
    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-200 dark:before:via-emerald-800 before:to-transparent">
      {[
        { step: 1, title: 'ইহরাম', desc: 'মিকাত অতিক্রম করার আগে গোসল করে ইহরামের কাপড় পরিধান করা। উমরার নিয়ত করা এবং তালবিয়া পড়া শুরু করা।' },
        { step: 2, title: 'তাওয়াফ', desc: 'মসজিদুল হারামে প্রবেশ করে হাজরে আসওয়াদ থেকে শুরু করে কাবা শরীফ ৭ বার প্রদক্ষিণ করা। এরপর মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ পড়া।' },
        { step: 3, title: 'সাঈ', desc: 'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড় পর্যন্ত ৭ বার চক্কর দেওয়া (সাফা থেকে মারওয়া ১ বার, মারওয়া থেকে সাফা ২ বার... এভাবে মারওয়ায় গিয়ে শেষ হবে)।' },
        { step: 4, title: 'মাথা মুণ্ডানো (হলক/কসর)', desc: 'পুরুষদের সম্পূর্ণ মাথা মুণ্ডানো বা চুল ছোট করা। মহিলাদের চুলের অগ্রভাগ থেকে এক ইঞ্চি পরিমাণ কাটা। এর মাধ্যমে ইহরাম শেষ হয়।' }
      ].map((item, i) => (
        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-50 dark:border-slate-950 bg-emerald-500 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            {item.step}
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-emerald-50 dark:border-slate-800">
            <h4 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 mb-1">{item.title}</h4>
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  hajj: (
    <div className="space-y-6">
      {[
        { day: '৮ জিলহজ', name: 'ইয়াওমুত তারবিয়া', desc: 'মক্কা থেকে ইহরাম বেঁধে মিনায় গমন। জোহর থেকে পরদিন ফজর পর্যন্ত ৫ ওয়াক্ত নামাজ মিনায় আদায় করা এবং রাত যাপন করা।' },
        { day: '৯ জিলহজ', name: 'ইয়াওমু আরাফা (হজ্বের মূল দিন)', desc: 'সূর্যোদয়ের পর মিনা থেকে আরাফাতের ময়দানে গমন। সূর্যাস্ত পর্যন্ত সেখানে অবস্থান করে দোয়া ও জিকির করা। সূর্যাস্তের পর মুজদালিফায় গিয়ে মাগরিব ও এশা একসাথে পড়া এবং খোলা আকাশের নিচে রাত যাপন করা।' },
        { day: '১০ জিলহজ', name: 'ইয়াওমুন নহর (কুরবানির দিন)', desc: 'ফজরের পর মুজদালিফা থেকে মিনায় ফেরা। বড় শয়তানকে ৭টি কঙ্কর মারা। কুরবানি করা। মাথা মুণ্ডানো। এরপর মক্কায় গিয়ে তাওয়াফে জিয়ারত (ফরজ তাওয়াফ) ও সাঈ করা।' },
        { day: '১১-১২ জিলহজ', name: 'আইয়ামে তাশরিক', desc: 'মিনায় অবস্থান করা। প্রতিদিন সূর্য হেলে পড়ার পর ছোট, মেজ ও বড় শয়তানকে ৭টি করে মোট ২১টি কঙ্কর মারা।' },
        { day: 'বিদায়', name: 'বিদায়ী তাওয়াফ', desc: 'মক্কা থেকে নিজ দেশে ফেরার আগে কাবা শরীফের শেষ তাওয়াফ করা (ওয়াজিব)।' }
      ].map((item, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 shrink-0">
            <div className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded-lg mb-2">
              {item.day}
            </div>
            <h4 className="font-bold text-lg text-gray-800 dark:text-slate-200">{item.name}</h4>
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  duas: (
    <div className="space-y-6">
      {[
        { 
          title: 'তালবিয়া (ইহরামের পর থেকে বেশি বেশি পড়তে হয়)', 
          arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ، وَالنِّعْمَةَ، لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ', 
          pronunciation: 'লাব্বাইক আল্লাহুম্মা লাব্বাইক, লাব্বাইকা লা শারীকা লাকা লাব্বাইক, ইন্নাল হামদা ওয়ান্‌ নি’মাতা লাকা ওয়াল মুলক, লা শারীকা লাক।',
          meaning: 'আমি হাজির হে আল্লাহ! আমি হাজির। আমি হাজির, আপনার কোনো শরিক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা ও নিয়ামত আপনারই এবং রাজত্বও। আপনার কোনো শরিক নেই।'
        },
        { 
          title: 'উমরার নিয়ত', 
          arabic: 'اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي', 
          pronunciation: 'আল্লাহুম্মা ইন্নি উরিদুল উমরাতা ফায়াসসিরহা লি ওয়া তাকাব্বালহা মিন্নি।',
          meaning: 'হে আল্লাহ! আমি উমরার ইচ্ছা করছি, আপনি তা আমার জন্য সহজ করে দিন এবং আমার পক্ষ থেকে কবুল করুন।'
        },
        { 
          title: 'হজ্বের নিয়ত', 
          arabic: 'اللَّهُمَّ إِنِّي أُرِيدُ الْحَجَّ فَيَسِّرْهُ لِي وَتَقَبَّلْهُ مِنِّي', 
          pronunciation: 'আল্লাহুম্মা ইন্নি উরিদুল হাজ্জা ফায়াসসিরহু লি ওয়া তাকাব্বালহু মিন্নি।',
          meaning: 'হে আল্লাহ! আমি হজ্বের ইচ্ছা করছি, আপনি তা আমার জন্য সহজ করে দিন এবং আমার পক্ষ থেকে কবুল করুন।'
        },
        { 
          title: 'রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝের দোয়া', 
          arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', 
          pronunciation: 'রাব্বানা আতিনা ফিদ দুনয়া হাসানাতাও ওয়া ফিল আখিরাতি হাসানাতাও ওয়াকিনা আজাবান নার।',
          meaning: 'হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দান করুন এবং আখেরাতেও কল্যাণ দান করুন এবং আমাদেরকে জাহান্নামের আজাব থেকে রক্ষা করুন।'
        }
      ].map((dua, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-800">
          <h4 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 mb-4">{dua.title}</h4>
          <p className="text-2xl font-arabic text-right leading-loose mb-4 text-gray-800 dark:text-slate-200" dir="rtl">{dua.arabic}</p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700 dark:text-slate-300"><span className="font-semibold text-emerald-600 dark:text-emerald-400">উচ্চারণ:</span> {dua.pronunciation}</p>
            <p className="text-gray-600 dark:text-slate-400"><span className="font-semibold text-emerald-600 dark:text-emerald-400">অর্থ:</span> {dua.meaning}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default function HajjUmrah() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <h1 className="text-4xl font-black mb-3 relative z-10">হজ্ব ও উমরাহ</h1>
        <p className="text-emerald-100 opacity-90 text-lg relative z-10">পবিত্র কাবা জিয়ারতের পূর্ণাঙ্গ গাইড</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-lg shadow-emerald-900/5 mb-8 border border-emerald-50 dark:border-slate-800 flex overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all flex-1 justify-center ${
                  isActive 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                <span className="font-bold text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
