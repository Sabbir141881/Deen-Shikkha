import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, User, Users, Briefcase, Book, Sparkles, Target, ShieldAlert, HeartHandshake, Lightbulb, Clock, MapPin, GitFork, BookOpenText, Info, ScrollText, LayoutList, Crown, Calendar, ArrowLeft, Quote, X, Network, Map, List, GraduationCap, MessageSquareQuote, Search } from 'lucide-react';
import { PROPHETS_DATA, FAMILY_TREE_DATA, PROPHET_LOCATIONS } from '../data';

export default function Prophets() {
  const [selectedProphetId, setSelectedProphetId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'timeline' | 'family-tree' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter prophets based on search
  const filteredProphets = PROPHETS_DATA.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProphetId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProphetId]);

  const selectedProphet = PROPHETS_DATA.find(p => p.id === selectedProphetId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-200 dark:border-emerald-800">
              ধারাবাহিক ইতিহাস
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              নবী-রাসূলদের <span className="text-emerald-600 dark:text-emerald-400">জীবনী</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
              হযরত আদম (আঃ) থেকে শুরু করে হযরত মুহাম্মদ (সাঃ) পর্যন্ত ২৫ জন নবীর জীবনের শিক্ষণীয় ঘটনাবলী ও বিস্তারিত ইতিহাস।
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="নবীর নাম দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-all"
              />
            </div>

            {/* View Switcher */}
            <div className="inline-flex bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto max-w-full">
              {[
                { id: 'list', label: 'তালিকা', icon: List },
                { id: 'timeline', label: 'টাইমলাইন', icon: Clock },
                { id: 'family-tree', label: 'বংশলতিকা', icon: Network },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    viewMode === view.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <view.icon size={16} />
                  {view.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content Views */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {viewMode === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProphetListView prophets={filteredProphets} onSelect={setSelectedProphetId} />
              </motion.div>
            )}
            {viewMode === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProphetTimelineView onSelect={setSelectedProphetId} />
              </motion.div>
            )}
            {viewMode === 'family-tree' && (
              <motion.div
                key="family-tree"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProphetFamilyTreeView onSelect={setSelectedProphetId} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen Detail View Overlay */}
      <AnimatePresence>
        {selectedProphet && (
          <ProphetDetails 
            prophet={selectedProphet} 
            onClose={() => setSelectedProphetId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProphetListView({ prophets, onSelect }: { prophets: any[], onSelect: (id: number) => void }) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Vertical Timeline Line */}
      <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200"></div>

      <div className="space-y-12">
        {prophets.map((prophet, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={prophet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center md:items-start group`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 z-10 flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-lg bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-200 dark:hover:border-emerald-800 group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30">
                {index + 1}
              </div>

              {/* Content Card Wrapper */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'} w-full`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 cursor-pointer overflow-hidden transition-all duration-300 group"
                  onClick={() => onSelect(prophet.id)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                        {prophet.period}
                      </span>
                      <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                      {prophet.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                      {prophet.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProphetTimelineView({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="overflow-x-auto pb-12 pt-4 px-4 custom-scrollbar">
      <div className="flex items-center min-w-max space-x-8 relative">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-emerald-100 dark:bg-emerald-900/40 -z-10 transform -translate-y-1/2"></div>
        
        {PROPHETS_DATA.map((prophet, index) => (
          <motion.div
            key={prophet.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center relative group cursor-pointer"
            onClick={() => onSelect(prophet.id)}
          >
            {/* Top Date/Period */}
            <div className={`mb-4 px-3 py-1 rounded-full text-xs font-medium border transition-all ${index % 2 === 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
              {prophet.period}
            </div>

            {/* Node */}
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-500 shadow-lg flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-emerald-600">
              <span className="text-lg font-bold text-emerald-800 dark:text-emerald-400">{index + 1}</span>
            </div>

            {/* Bottom Content */}
            <div className="mt-4 w-48 text-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:shadow-md group-hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{prophet.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{prophet.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProphetFamilyTreeView({ onSelect }: { onSelect: (id: number) => void }) {
  // Desktop View (Horizontal Tree)
  const renderDesktopNode = (node: any) => {
    return (
      <div className="flex flex-col items-center">
        <div 
          className={`p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all min-w-[140px] text-center group relative z-10 ${node.id === 25 ? 'border-emerald-500 ring-2 ring-emerald-100' : ''}`}
          onClick={() => {
            if (node.id && node.id < 100) onSelect(node.id);
          }}
        >
          <h4 className={`font-bold ${node.id === 25 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>{node.name}</h4>
          {node.id === 25 && <Crown size={16} className="absolute -top-2 -right-2 text-amber-500 fill-current" />}
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center mt-4 w-full">
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex gap-8 relative pt-4">
              {/* Horizontal connector line */}
              {node.children.length > 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-slate-300 w-[calc(100%-2rem)]"></div>
              )}
              
              {node.children.map((child: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center relative">
                  {/* Vertical connector to child */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-slate-300"></div>
                  {renderDesktopNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Mobile View (Vertical List with Indentation)
  const renderMobileNode = (node: any) => {
    return (
      <div className="w-full">
        <div 
          className={`w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer active:scale-95 transition-transform ${node.id === 25 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30/30' : ''}`}
          onClick={() => {
            if (node.id && node.id < 100) onSelect(node.id);
          }}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${node.id === 25 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
              {node.name.charAt(0)}
            </div>
            <span className={`font-medium text-sm truncate ${node.id === 25 ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{node.name}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {node.id === 25 && <Crown size={14} className="text-amber-500 fill-current" />}
            {(node.id && node.id < 100) && <ChevronRight size={14} className="text-slate-300" />}
          </div>
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="pl-2 border-l-2 border-slate-100 dark:border-slate-800 ml-2 mt-2 space-y-2">
            {node.children.map((child: any, idx: number) => (
              <div key={idx}>
                {renderMobileNode(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop View - Hidden on Mobile */}
      <div className="hidden md:block overflow-x-auto p-8 custom-scrollbar">
        <div className="min-w-max flex justify-center">
          {renderDesktopNode(FAMILY_TREE_DATA)}
        </div>
      </div>

      {/* Mobile View - Hidden on Desktop */}
      <div className="md:hidden p-4 bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4 bg-white dark:bg-slate-900 py-2 px-4 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 mx-auto w-max">
          <Network size={14} />
          <span>বংশলতিকা দেখতে ডানে স্ক্রল করুন</span>
          <ChevronRight size={14} className="animate-pulse" />
        </div>
        
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[600px] px-2">
            {renderMobileNode(FAMILY_TREE_DATA)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProphetMapView({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="bg-emerald-900 rounded-3xl overflow-hidden relative min-h-[600px] flex items-center justify-center p-4">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Content */}
      <div className="relative w-full max-w-4xl aspect-[16/9] bg-emerald-800/50 rounded-2xl border border-emerald-700/50 backdrop-blur-sm p-8 shadow-2xl">
        <h3 className="text-white/80 text-center mb-8 font-medium">মধ্যপ্রাচ্য ও তৎসংলগ্ন অঞ্চল</h3>
        
        {/* Simplified Map Representation */}
        <div className="relative w-full h-full">
          {/* We are using a relative positioning system here for simplicity instead of a real GeoJSON map */}
          {PROPHET_LOCATIONS.map((loc) => (
            <motion.div
              key={loc.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                // Converting lat/lng to approximate % positions for a specific viewbox of the Middle East
                // This is a rough approximation for visualization
                left: `${(loc.lng - 30) * 3.5}%`, 
                bottom: `${(loc.lat - 12) * 3.2}%` 
              }}
              onClick={() => onSelect(loc.id)}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-pulse"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {loc.name}
                  <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400">{loc.location}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Region Labels */}
          <div className="absolute bottom-[20%] left-[25%] text-white/10 text-4xl font-bold tracking-widest pointer-events-none">AFRICA</div>
          <div className="absolute top-[30%] right-[30%] text-white/10 text-4xl font-bold tracking-widest pointer-events-none">ASIA</div>
        </div>
      </div>
    </div>
  );
}

function ProphetDetails({ prophet, onClose }: { prophet: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('identity');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isReadingMode, setIsReadingMode] = useState(false);

  if (isReadingMode) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-white dark:bg-slate-900 overflow-y-auto font-serif"
      >
        <div className="max-w-3xl mx-auto px-6 py-20">
          <button 
            onClick={() => setIsReadingMode(false)}
            className="fixed top-8 left-8 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 rounded-full transition-all text-slate-600 dark:text-slate-400 z-50"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 font-sans font-bold tracking-widest uppercase text-sm mb-4 block">
              পূর্ণাঙ্গ ইতিহাস
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-slate-100 mb-8 leading-tight">
              {prophet.name}
            </h1>
            <div className="h-1 w-24 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-xl text-slate-500 dark:text-slate-400 italic leading-relaxed">
              {prophet.description}
            </p>
          </div>

          <div className="space-y-20">
            <section>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 border-b pb-4 font-sans">সংক্ষিপ্ত পরিচিতি</h2>
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-loose first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-600 dark:text-emerald-400 first-letter:mr-3 first-letter:float-left">
                {prophet.details.history}
              </p>
            </section>

            {prophet.details.keyEvents && prophet.details.keyEvents.map((event: any, idx: number) => (
              <section key={idx} className="relative">
                <div className="absolute -left-12 top-0 text-8xl font-black text-slate-50 opacity-10 select-none font-sans">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-sans">{typeof event === 'string' ? event : event.title}</h2>
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-loose">
                  {typeof event === 'string' ? 'বিস্তারিত তথ্য শীঘ্রই আসছে...' : event.fullStory}
                </p>
              </section>
            ))}

            <section className="bg-emerald-50 dark:bg-emerald-900/30 p-10 rounded-3xl border border-emerald-100 dark:border-emerald-900/50">
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 font-sans">মূল শিক্ষা</h2>
              <ul className="space-y-6">
                {prophet.details.lessons?.map((lesson: string, idx: number) => (
                  <li key={idx} className="flex gap-4 text-xl text-emerald-800 dark:text-emerald-400 leading-relaxed">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-400 font-sans">
                      {idx + 1}
                    </span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
            <button 
              onClick={() => setIsReadingMode(false)}
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 font-sans"
            >
              পড়া শেষ করুন
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto"
    >
      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <div className="relative bg-emerald-900 text-white min-h-[40vh] flex flex-col justify-center items-center px-4 md:px-8 pb-16 pt-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-[20px] border-white/10 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl"></div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 rounded-full backdrop-blur-md transition-all text-sm font-medium border border-white/10"
          >
            <ArrowLeft size={18} /> ফিরে যান
          </button>
          <div className="text-white/50 text-sm font-mono tracking-widest hidden md:block">PROPHET PROFILE</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 text-sm font-medium mb-6 backdrop-blur-sm">
              {prophet.period}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {prophet.name}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/90 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              {prophet.description}
            </p>
            <button 
              onClick={() => setIsReadingMode(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-emerald-900 rounded-full font-bold hover:bg-emerald-50 dark:bg-emerald-900/30 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <BookOpenText size={20} /> পূর্ণাঙ্গ ইতিহাস পড়ুন
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 min-h-[60vh]">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900/95 backdrop-blur-md z-30 overflow-x-auto">
            {[
              { id: 'identity', label: 'পরিচিতি ও ইতিহাস', icon: Info },
              { id: 'spiritual', label: 'নবুওয়াত ও মুজিজা', icon: ScrollText },
              { id: 'social', label: 'সমাজ ও পরিবার', icon: LayoutList },
              { id: 'lessons', label: 'শিক্ষা ও আমল', icon: GraduationCap },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] py-5 text-sm md:text-base font-medium flex items-center justify-center gap-2 transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30/30' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === tab.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'identity' && (
                <motion.div 
                  key="identity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {/* History Section */}
                  <div className="prose prose-lg max-w-none">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-700 dark:text-emerald-400 mt-1">
                        <BookOpenText size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">সংক্ষিপ্ত ইতিহাস</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg">
                          {prophet.details.history}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailCard icon={Crown} title="উপাধি" value={prophet.details.titles} color="amber" />
                    <DetailCard icon={GitFork} title="বংশলতিকা" value={prophet.details.lineage} color="blue" />
                    <DetailCard icon={Clock} title="বয়স" value={prophet.details.age} color="emerald" />
                    <DetailCard icon={MapPin} title="স্থান" value={prophet.details.locations} color="rose" />
                    <DetailCard icon={Users} title="সমসাময়িক" value={prophet.details.contemporaryProphets} color="indigo" />
                  </div>

                  {/* Key Events Timeline */}
                  {prophet.details.keyEvents && (
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                        <Calendar className="text-emerald-600 dark:text-emerald-400" /> প্রধান ঘটনাবলী
                      </h3>
                      <div className="space-y-4">
                        {prophet.details.keyEvents.map((event: any, idx: number) => {
                          const isString = typeof event === 'string';
                          const title = isString ? event : event.title;
                          const description = isString ? '' : event.shortDescription;

                          return (
                            <div 
                              key={idx} 
                              onClick={() => setSelectedEvent(isString ? { title: event, fullStory: 'বিস্তারিত তথ্য শীঘ্রই আসছে...' } : event)}
                              className="flex items-center gap-4 group cursor-pointer hover:bg-emerald-50 dark:bg-emerald-900/30/50 p-2 rounded-xl transition-all"
                            >
                              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
                                <p className="text-slate-700 dark:text-slate-300 font-medium">{title}</p>
                                {description && (
                                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2">{description}</p>
                                )}
                              </div>
                              <div className="text-slate-300 group-hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                                <ChevronRight size={18} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'spiritual' && (
                <motion.div 
                  key="spiritual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {/* Quran & Book Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Book size={100} />
                      </div>
                      <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-2">কুরআনে উল্লেখ</h3>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{prophet.details.quranMentions}</p>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BookOpenText size={100} />
                      </div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-2">আসমানী কিতাব</h3>
                      <p className="text-2xl font-bold text-indigo-600">{prophet.details.book}</p>
                    </div>
                  </div>

                  {/* Related Surahs */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                      <BookOpenText className="text-emerald-600 dark:text-emerald-400" /> সংশ্লিষ্ট সূরা
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {prophet.details.relatedSurahs.split(',').map((surah: string, idx: number) => (
                        <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-emerald-100 dark:bg-emerald-900/40 hover:text-emerald-800 dark:text-emerald-400 transition-colors cursor-default">
                          {surah.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Miracles */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                    <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                      <Sparkles className="text-amber-600" /> অলৌকিক ঘটনা (মুজিজা)
                    </h3>
                    <p className="text-lg text-amber-900/80 leading-relaxed">
                      {prophet.details.miracles}
                    </p>
                  </div>

                  {/* Dua & Teachings */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <HeartHandshake className="text-rose-500" /> বিখ্যাত দোয়া
                      </h3>
                      <blockquote className="relative p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border-l-4 border-rose-400 italic text-slate-700 dark:text-slate-300 text-lg">
                        <Quote className="absolute top-2 left-2 w-4 h-4 text-rose-300 transform -scale-x-100" />
                        "{prophet.details.famousDua}"
                      </blockquote>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" /> মূল শিক্ষা
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                        {prophet.details.teachings}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'social' && (
                <motion.div 
                  key="social"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {/* Mission & Enemy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                      <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5" /> যাদের প্রতি প্রেরিত
                      </h3>
                      <p className="text-xl text-blue-800">{prophet.details.sentTo}</p>
                    </div>
                    <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                      <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> প্রধান শত্রু
                      </h3>
                      <p className="text-xl text-red-800">{prophet.details.enemy}</p>
                    </div>
                  </div>

                  {/* Family Section */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-950 px-8 py-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">পারিবারিক তথ্য</h3>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" /> স্ত্রীগণ
                        </h4>
                        <ul className="space-y-3">
                          {prophet.details.wives.map((wife: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg">
                              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                              {wife}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Users className="w-4 h-4" /> সন্তানাদি
                        </h4>
                        <ul className="space-y-3">
                          {prophet.details.children.map((child: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg">
                              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                              {child}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Occupation */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                      <Briefcase className="text-emerald-600 dark:text-emerald-400" /> পেশা ও কর্ম
                    </h3>
                    <p className="text-lg text-slate-700 dark:text-slate-300">
                      {prophet.details.childrenOccupation}
                    </p>
                  </div>

                  {/* Individual Family Tree */}
                  {prophet.details.familyTree && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                        <Network className="text-emerald-600 dark:text-emerald-400" /> ব্যক্তিগত বংশলতিকা
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {prophet.details.familyTree.map((member: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                              <User size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 dark:text-slate-200">{member.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{member.relation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'lessons' && (
                <motion.div 
                  key="lessons"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/50">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                      <GraduationCap className="text-emerald-600 dark:text-emerald-400" /> জীবন থেকে শিক্ষা
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prophet.details.lessons ? prophet.details.lessons.map((lesson: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{lesson}</p>
                        </div>
                      )) : (
                        <p className="text-slate-500 dark:text-slate-400 italic">এই নবীর জন্য কোনো বিশেষ শিক্ষা এখনও যুক্ত করা হয়নি।</p>
                      )}
                    </div>
                  </div>

                  {prophet.details.hadith && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <MessageSquareQuote className="text-emerald-600 dark:text-emerald-400" /> হাদিসের আলোকে
                      </h3>
                      <blockquote className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border-l-4 border-emerald-500 italic text-slate-700 dark:text-slate-300 text-lg leading-loose">
                        "{prophet.details.hadith}"
                      </blockquote>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EventModal({ event, onClose }: { event: any, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 pr-8">{event.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="prose prose-emerald max-w-none">
            {event.fullStory ? (
              <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {event.fullStory}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500">
                <ScrollText size={48} className="mb-4 opacity-50" />
                <p>বিস্তারিত তথ্য শীঘ্রই আসছে...</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailCard({ icon: Icon, title, value, color = "slate" }: any) {
  const colorClasses: any = {
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    slate: "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-800",
  };

  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">{title}</h4>
          <p className="font-semibold text-lg leading-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}
