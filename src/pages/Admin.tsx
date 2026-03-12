import React, { useEffect, useState } from 'react';
import { ShieldCheck, Clock, CheckCircle, XCircle, Search, Trash2 } from 'lucide-react';

interface Transaction {
  id: string;
  method: string;
  amount: number;
  trxID: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Admin() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    const updated = transactions.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত এই ট্রানজেকশনটি মুছে ফেলতে চান?')) {
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      localStorage.setItem('transactions', JSON.stringify(updated));
    }
  };

  const filteredTransactions = transactions.filter(t => 
    t.trxID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = transactions.reduce((sum, t) => t.status === 'approved' ? sum + t.amount : sum, 0);
  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      <div className="bg-slate-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" /> অ্যাডমিন প্যানেল
            </h1>
            <p className="text-slate-400 text-sm mt-1">পেমেন্ট ট্রানজেকশন ম্যানেজমেন্ট</p>
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="bg-slate-700 px-4 py-2 rounded-lg">
              <span className="text-slate-400 block text-xs">মোট সংগ্রহ</span>
              <span className="font-bold text-emerald-400 text-lg">৳ {totalAmount.toLocaleString()}</span>
            </div>
            <div className="bg-slate-700 px-4 py-2 rounded-lg">
              <span className="text-slate-400 block text-xs">পেন্ডিং রিকোয়েস্ট</span>
              <span className="font-bold text-yellow-400 text-lg">{pendingCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="TrxID দিয়ে খুঁজুন..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white"
              />
            </div>
            <button 
              onClick={() => {
                if(confirm('সব ডাটা মুছে ফেলতে চান?')) {
                  localStorage.removeItem('transactions');
                  setTransactions([]);
                }
              }}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              সব মুছে ফেলুন
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4">সময়</th>
                  <th className="px-6 py-4">মেথড</th>
                  <th className="px-6 py-4">TrxID</th>
                  <th className="px-6 py-4 text-right">পরিমাণ</th>
                  <th className="px-6 py-4 text-center">স্ট্যাটাস</th>
                  <th className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      কোনো ট্রানজেকশন পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {new Date(trx.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                          ${trx.method === 'বিকাশ' ? 'bg-pink-100 text-pink-700' : 
                            trx.method === 'নগদ' ? 'bg-orange-100 text-orange-700' :
                            trx.method === 'রকেট' ? 'bg-purple-100 text-purple-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {trx.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-800 dark:text-gray-200 select-all">
                        {trx.trxID}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-white">
                        ৳ {trx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${trx.status === 'approved' ? 'bg-green-100 text-green-700' : 
                            trx.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {trx.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                          {trx.status === 'rejected' && <XCircle className="w-3 h-3" />}
                          {trx.status === 'pending' && <Clock className="w-3 h-3" />}
                          {trx.status === 'approved' ? 'গৃহীত' : trx.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমান'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {trx.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(trx.id, 'approved')}
                                className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleStatusChange(trx.id, 'rejected')}
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleDelete(trx.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
