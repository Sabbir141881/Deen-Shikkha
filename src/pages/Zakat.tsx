import React, { useState } from 'react';
import { Calculator, Coins, HelpCircle, Info } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

export default function Zakat() {
  const [assets, setAssets] = useState({
    gold: 0,
    silver: 0,
    cash: 0,
    bank: 0,
    business: 0,
    loans: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zakatAmount, setZakatAmount] = useState(0);

  const calculateZakat = () => {
    const totalAssets = 
      (assets.gold * 10000) + // Assuming 10000 BDT per gram (rough estimate)
      (assets.silver * 150) + // Assuming 150 BDT per gram
      assets.cash +
      assets.bank +
      assets.business;
    
    const netAssets = totalAssets - assets.loans;
    
    // Nisab threshold (approximate)
    const nisab = 85000; // Example value

    if (netAssets >= nisab) {
      setZakatAmount(Math.round(netAssets * 0.025));
    } else {
      setZakatAmount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Coins className="w-10 h-10" /> যাকাত ক্যালকুলেটর
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg opacity-90">
            আপনার সম্পদের সঠিক যাকাত হিসাব করুন এবং আল্লাহর সন্তুষ্টি অর্জনে এগিয়ে আসুন।
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-slate-800">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-slate-800">
                <Calculator className="w-5 h-5 text-emerald-600" />
                সম্পদের বিবরণ
              </h2>

              <div className="space-y-4">
                {[
                  { label: 'স্বর্ণ (গ্রাম)', key: 'gold', placeholder: 'কত গ্রাম স্বর্ণ আছে?' },
                  { label: 'রৌপ্য (গ্রাম)', key: 'silver', placeholder: 'কত গ্রাম রৌপ্য আছে?' },
                  { label: 'নগদ টাকা', key: 'cash', placeholder: 'হাতে কত টাকা আছে?' },
                  { label: 'ব্যাংক জমা', key: 'bank', placeholder: 'ব্যাংকে কত টাকা আছে?' },
                  { label: 'ব্যবসায়িক পণ্য', key: 'business', placeholder: 'ব্যবসায়িক পণ্যের মূল্য?' },
                  { label: 'ঋণ (বাদ যাবে)', key: 'loans', placeholder: 'কত টাকা ঋণ আছে?' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full pl-4 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 dark:bg-slate-800 dark:text-white transition-all"
                        placeholder={field.placeholder}
                        onChange={(e) => setAssets({ ...assets, [field.key as keyof typeof assets]: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={calculateZakat}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                হিসাব করুন
              </button>
            </div>

            {/* Result Section */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-emerald-100 dark:border-emerald-800/30">
              <div className="w-20 h-20 bg-white dark:bg-emerald-800 rounded-full flex items-center justify-center shadow-sm">
                <Coins className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">আপনার মোট প্রদেয় যাকাত</h3>
                <div className="text-5xl font-bold text-emerald-700 dark:text-emerald-400 my-2">
                  ৳ {zakatAmount.toLocaleString()}
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  (নিসাব পরিমাণ সম্পদ থাকলে ২.৫% হারে)
                </p>
              </div>

              {zakatAmount > 0 ? (
                <div className="w-full space-y-3 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
                  <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                    আপনি কি এখন যাকাত প্রদান করতে চান?
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all animate-pulse"
                  >
                    যাকাত প্রদান করুন
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-sm text-gray-500 dark:text-gray-400 flex items-start gap-3 text-left">
                  <Info className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p>
                    আপনার সম্পদের পরিমাণ নিসাব (সাড়ে ৭ ভরি স্বর্ণ বা সাড়ে ৫২ ভরি রৌপ্য সমপরিমাণ মূল্য) অতিক্রম করলে তবেই যাকাত ফরজ হবে।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            { q: 'যাকাত কাদের দেওয়া যাবে?', a: 'ফকির, মিসকিন, যাকাত আদায়কারী কর্মচারী, নওমুসলিম, দাসমুক্তি, ঋণগ্রস্ত ব্যক্তি, আল্লাহর পথে জিহাদকারী ও মুসাফিরদের।' },
            { q: 'যাকাত কখন ফরজ হয়?', a: 'নিসাব পরিমাণ সম্পদ পূর্ণ এক বছর মালিকানায় থাকলে যাকাত ফরজ হয়।' },
            { q: 'স্বর্ণ ও রৌপ্যের নিসাব কত?', a: 'সাড়ে ৭ তোলা (ভরি) স্বর্ণ অথবা সাড়ে ৫২ তোলা (ভরি) রৌপ্য।' },
            { q: 'ব্যবসায়িক পণ্যের যাকাত কীভাবে?', a: 'বছরের শেষে ব্যবসায়িক পণ্যের বর্তমান বাজারমূল্য হিসাব করে ২.৫% যাকাত দিতে হবে।' },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all">
              <h3 className="font-bold text-gray-800 dark:text-white flex items-start gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="যাকাত"
        defaultAmount={zakatAmount}
      />
    </div>
  );
}
