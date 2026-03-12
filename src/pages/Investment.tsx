import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Users, Wallet, ArrowRight } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const PACKAGES = [
  {
    id: 1,
    title: 'হালাল ব্যবসা',
    roi: '১২-১৫%',
    duration: '১ বছর',
    minInvest: 5000,
    risk: 'নিম্ন',
    desc: 'হালাল পণ্যের ব্যবসায় বিনিয়োগ। শরীয়াহ সম্মত মুনাফা বন্টন।',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 2,
    title: 'কৃষি প্রজেক্ট',
    roi: '১৮-২২%',
    duration: '৬ মাস',
    minInvest: 10000,
    risk: 'মাঝারি',
    desc: 'মৌসুমি ফসল ও মৎস্য খামারে বিনিয়োগ।',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 3,
    title: 'রিয়েল এস্টেট',
    roi: '১০-১২%',
    duration: '৩ বছর',
    minInvest: 50000,
    risk: 'খুব কম',
    desc: 'জমি ও ফ্ল্যাট ব্যবসায় দীর্ঘমেয়াদী বিনিয়োগ।',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

export default function Investment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const handleInvest = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-3 leading-tight">
            <Wallet className="w-12 h-12 text-emerald-300" />
            হালাল বিনিয়োগে <span className="text-emerald-200">সমৃদ্ধ হোন</span>
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl opacity-90 leading-relaxed">
            সুদমুক্ত হালাল ব্যবসায় বিনিয়োগ করুন এবং দুনিয়া ও আখিরাতে লাভবান হোন।
            আমাদের প্রতিটি প্রজেক্ট ১০০% শরীয়াহ সম্মত।
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'মোট বিনিয়োগকারী', val: '৫,০০০+' },
          { label: 'সফল প্রজেক্ট', val: '১২০+' },
          { label: 'গড় মুনাফা', val: '১৫%' },
          { label: 'শরীয়াহ বোর্ড', val: '৫ সদস্য' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg text-center border border-gray-100 dark:border-slate-800">
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{stat.val}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Packages Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">আমাদের বিনিয়োগ প্যাকেজসমূহ</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            আপনার পছন্দ ও সামর্থ্য অনুযায়ী প্যাকেজ বেছে নিন। প্রতিটি প্যাকেজে রয়েছে স্বচ্ছতা ও হালাল মুনাফার নিশ্চয়তা।
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
              <div className={`p-6 ${pkg.color} dark:bg-opacity-10 dark:border-opacity-20 border-b`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${pkg.color.split(' ')[1]}`}>
                    {pkg.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full text-xs font-bold uppercase tracking-wider">
                    ঝুঁকি: {pkg.risk}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{pkg.title}</h3>
                <p className="text-sm opacity-80">{pkg.desc}</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">প্রত্যাশিত মুনাফা</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{pkg.roi}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">মেয়াদ</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{pkg.duration}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">সর্বনিম্ন বিনিয়োগ</span>
                    <span className="font-bold text-gray-800 dark:text-white">৳ {pkg.minInvest.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-right text-emerald-600 dark:text-emerald-400 font-medium">৭৫% কোটা পূরণ হয়েছে</p>
                </div>

                <button
                  onClick={() => handleInvest(pkg)}
                  className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  বিনিয়োগ করুন <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">আমাদের পার্টনার ও পেমেন্ট গেটওয়ে</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos would go here, using text for now */}
            <span className="text-2xl font-bold text-pink-600">bKash</span>
            <span className="text-2xl font-bold text-orange-600">Nagad</span>
            <span className="text-2xl font-bold text-purple-600">Rocket</span>
            <span className="text-2xl font-bold text-blue-600">Upay</span>
            <span className="text-2xl font-bold text-green-600">Islami Bank</span>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPackage?.title || 'বিনিয়োগ'}
        defaultAmount={selectedPackage?.minInvest}
      />
    </div>
  );
}
