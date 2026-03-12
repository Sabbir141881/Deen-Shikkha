import React, { useState } from 'react';
import { Search, MapPin, Navigation, Map } from 'lucide-react';
import { MOSQUES_DATA } from '../data/mosques';
import { BANGLADESH_DISTRICTS } from '../data/districts';

export default function FindMosque() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filteredMosques = MOSQUES_DATA.filter(mosque => {
    const matchesSearch = mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mosque.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || mosque.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  // Get unique districts from the mosque data to populate the filter, 
  // or use the full district list if we want to show all options even if empty
  const availableDistricts = Array.from(new Set(MOSQUES_DATA.map(m => m.district))).sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-900 text-white py-8 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Map className="w-8 h-8" />
            মসজিদ খুঁজি
          </h1>
          <p className="text-emerald-100">আপনার নিকটস্থ এবং ঐতিহাসিক মসজিদগুলো খুঁজে বের করুন</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="মসজিদের নাম বা এলাকা খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white cursor-pointer transition-all"
            >
              <option value="all">সকল জেলা</option>
              {availableDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mosque List */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredMosques.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">কোনো মসজিদ পাওয়া যায়নি</h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">অন্য কোনো নাম বা জেলা দিয়ে চেষ্টা করুন</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMosques.map(mosque => (
              <div key={mosque.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={mosque.image} 
                    alt={mosque.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {mosque.district}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1" title={mosque.name}>
                    {mosque.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-start gap-1.5 line-clamp-2 h-10">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    {mosque.location}
                  </p>
                  
                  {mosque.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-10">
                      {mosque.description}
                    </p>
                  )}

                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mosque.name + ' ' + mosque.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    ম্যাপে দেখুন
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
