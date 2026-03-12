import React, { useState } from 'react';
import { X, Check, Loader2, CreditCard, Copy, ArrowLeft } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  defaultAmount?: number;
}

const PAYMENT_METHODS = [
  { id: 'bkash', name: 'বিকাশ', color: 'bg-pink-600', logo: 'https://freelogopng.com/images/all_img/1656234745bkash-app-logo-png.png' },
  { id: 'nagad', name: 'নগদ', color: 'bg-orange-600', logo: 'https://freelogopng.com/images/all_img/1679248787nagad-logo.png' },
  { id: 'rocket', name: 'রকেট', color: 'bg-purple-600', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png' },
  { id: 'upay', name: 'উপায়', color: 'bg-yellow-500', logo: 'https://seeklogo.com/images/U/upay-logo-5638361713-seeklogo.com.png' },
];

const ADMIN_NUMBER = "01765236595";

export default function PaymentModal({ isOpen, onClose, title, defaultAmount = 0 }: PaymentModalProps) {
  const [amount, setAmount] = useState<string>(defaultAmount > 0 ? defaultAmount.toString() : '');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [step, setStep] = useState<'amount' | 'method' | 'verify' | 'processing' | 'success'>('amount');
  const [trxID, setTrxID] = useState('');
  const [copied, setCopied] = useState(false);

  const theme = React.useMemo(() => {
    switch (selectedMethod) {
      case 'bkash':
        return {
          header: 'bg-pink-600 dark:bg-pink-800',
          text: 'text-pink-600 dark:text-pink-400',
          textBold: 'text-pink-700 dark:text-pink-400',
          border: 'border-pink-200 dark:border-pink-800',
          bgLight: 'bg-pink-50 dark:bg-pink-900/20',
          button: 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/20',
          ring: 'focus:ring-pink-500',
          inputBorder: 'focus:border-pink-500',
          loader: 'text-pink-500',
          borderSpin: 'border-pink-500',
          successIcon: 'text-pink-600 dark:text-pink-400',
          successBg: 'bg-pink-100 dark:bg-pink-900/30',
        };
      case 'nagad':
        return {
          header: 'bg-orange-600 dark:bg-orange-800',
          text: 'text-orange-600 dark:text-orange-400',
          textBold: 'text-orange-700 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800',
          bgLight: 'bg-orange-50 dark:bg-orange-900/20',
          button: 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/20',
          ring: 'focus:ring-orange-500',
          inputBorder: 'focus:border-orange-500',
          loader: 'text-orange-500',
          borderSpin: 'border-orange-500',
          successIcon: 'text-orange-600 dark:text-orange-400',
          successBg: 'bg-orange-100 dark:bg-orange-900/30',
        };
      case 'rocket':
        return {
          header: 'bg-purple-600 dark:bg-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          textBold: 'text-purple-700 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800',
          bgLight: 'bg-purple-50 dark:bg-purple-900/20',
          button: 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20',
          ring: 'focus:ring-purple-500',
          inputBorder: 'focus:border-purple-500',
          loader: 'text-purple-500',
          borderSpin: 'border-purple-500',
          successIcon: 'text-purple-600 dark:text-purple-400',
          successBg: 'bg-purple-100 dark:bg-purple-900/30',
        };
      case 'upay':
        return {
          header: 'bg-yellow-500 dark:bg-yellow-700',
          text: 'text-yellow-600 dark:text-yellow-400',
          textBold: 'text-yellow-700 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-800',
          bgLight: 'bg-yellow-50 dark:bg-yellow-900/20',
          button: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20',
          ring: 'focus:ring-yellow-500',
          inputBorder: 'focus:border-yellow-500',
          loader: 'text-yellow-500',
          borderSpin: 'border-yellow-500',
          successIcon: 'text-yellow-600 dark:text-yellow-400',
          successBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        };
      default:
        return {
          header: 'bg-emerald-600 dark:bg-emerald-800',
          text: 'text-emerald-600 dark:text-emerald-400',
          textBold: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
          bgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
          button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20',
          ring: 'focus:ring-emerald-500',
          inputBorder: 'focus:border-emerald-500',
          loader: 'text-emerald-500',
          borderSpin: 'border-emerald-500',
          successIcon: 'text-emerald-600 dark:text-emerald-400',
          successBg: 'bg-emerald-100 dark:bg-emerald-900/30',
        };
    }
  }, [selectedMethod]);

  if (!isOpen) return null;

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) > 0) {
      setStep('method');
    }
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('verify');
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(ADMIN_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trxID && amount) {
      setStep('processing');
      
      // Save transaction to localStorage
      const newTransaction = {
        id: Date.now().toString(),
        method: PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name || selectedMethod,
        amount: Number(amount),
        trxID: trxID,
        date: new Date().toISOString(),
        status: 'pending'
      };

      const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      localStorage.setItem('transactions', JSON.stringify([newTransaction, ...existingTransactions]));

      setTimeout(() => {
        setStep('success');
      }, 2000);
    }
  };

  const reset = () => {
    setAmount(defaultAmount > 0 ? defaultAmount.toString() : '');
    setSelectedMethod(null);
    setStep('amount');
    setTrxID('');
    onClose();
  };

  const handleBack = () => {
    if (step === 'verify') setStep('method');
    else if (step === 'method') setStep('amount');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className={`${theme.header} p-4 flex justify-between items-center text-white transition-colors duration-300`}>
          <div className="flex items-center gap-2">
            {step !== 'amount' && step !== 'success' && (
              <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full transition-colors mr-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {title} পেমেন্ট
            </h3>
          </div>
          <button onClick={reset} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'amount' && (
            <form onSubmit={handleAmountSubmit} className="space-y-6">
              <div className="text-center space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">টাকার পরিমাণ দিন</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full text-center text-3xl font-bold py-4 px-8 border-2 border-gray-200 dark:border-slate-700 rounded-xl ${theme.inputBorder} focus:ring-0 bg-transparent dark:text-white transition-colors`}
                    placeholder="0"
                    autoFocus
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[100, 500, 1000, 2000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className={`py-2 px-3 text-sm font-medium bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:${theme.bgLight} hover:${theme.text} border border-transparent hover:${theme.border} transition-all`}
                  >
                    ৳ {val.toLocaleString()}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!amount || Number(amount) <= 0}
                className={`w-full py-3.5 ${theme.button} text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2`}
              >
                পরবর্তী ধাপ
              </button>
            </form>
          )}

          {step === 'method' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">টাকার পরিমাণ</p>
                <p className={`text-3xl font-bold ${theme.text}`}>৳ {Number(amount).toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">পেমেন্ট মেথড সিলেক্ট করুন</label>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleMethodSelect(method.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 bg-white dark:bg-slate-800 group hover:shadow-md`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs ${method.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        {method.name}
                      </div>
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'verify' && selectedMethod && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className={`${theme.bgLight} ${theme.border} border p-4 rounded-xl text-center space-y-3`}>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  নিচের নাম্বারে <span className={`font-bold ${theme.textBold}`}>সেন্ড মানি (Send Money)</span> করুন
                </p>
                <div className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                  <span className="text-xl font-mono font-bold text-gray-800 dark:text-white tracking-wider">{ADMIN_NUMBER}</span>
                  <button 
                    onClick={handleCopyNumber}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500"
                    title="Copy Number"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name} পার্সোনাল নাম্বার
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ট্রানজেকশন আইডি (TrxID)
                  </label>
                  <input
                    type="text"
                    value={trxID}
                    onChange={(e) => setTrxID(e.target.value)}
                    placeholder="উদাহরণ: 8N7A6D5..."
                    className={`w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent bg-white dark:bg-slate-900 dark:text-white uppercase font-mono transition-all`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    টাকার পরিমাণ
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className={`w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent bg-white dark:bg-slate-900 dark:text-white font-bold transition-all`}
                      required
                      min="1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!trxID || !amount}
                  className={`w-full py-3.5 ${theme.button} text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  সাবমিট করুন
                </button>
              </form>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8 space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-gray-100 dark:border-slate-800 rounded-full"></div>
                <div className={`absolute inset-0 border-4 ${theme.borderSpin} rounded-full border-t-transparent animate-spin`}></div>
                <Loader2 className={`absolute inset-0 m-auto ${theme.loader} w-8 h-8 animate-spin`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">যাচাই করা হচ্ছে...</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">আপনার পেমেন্ট তথ্য যাচাই করা হচ্ছে</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in duration-300">
              <div className={`w-24 h-24 ${theme.successBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Check className={`w-12 h-12 ${theme.successIcon}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">পেমেন্ট সফল হয়েছে!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">ট্রানজেকশন আইডি</span>
                  <span className="font-mono font-medium text-gray-800 dark:text-gray-200">{trxID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">মেথড</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">পরিমাণ</span>
                  <span className={`font-bold ${theme.text}`}>৳ {Number(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">সময়</span>
                  <span className="text-gray-800 dark:text-gray-200">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-all"
              >
                বন্ধ করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
