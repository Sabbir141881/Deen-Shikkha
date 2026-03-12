import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  ChevronLeft, Music, Volume2, Search,
  Heart, Share2, ListMusic, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MISHARY_AL_AFASY_RECITATIONS } from '../data/surahs';

export default function Recitation() {
  const [currentTrack, setCurrentTrack] = useState(MISHARY_AL_AFASY_RECITATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  const playTrack = (track: typeof MISHARY_AL_AFASY_RECITATIONS[0]) => {
    if (currentTrack.id === track.id) {
      togglePlay();
      return;
    }

    setCurrentTrack(track);
    setIsLoading(true);
    
    // Auto-scroll to player
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  };

  const playNext = () => {
    const currentIndex = MISHARY_AL_AFASY_RECITATIONS.findIndex(r => r.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % MISHARY_AL_AFASY_RECITATIONS.length;
    playTrack(MISHARY_AL_AFASY_RECITATIONS[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = MISHARY_AL_AFASY_RECITATIONS.findIndex(r => r.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + MISHARY_AL_AFASY_RECITATIONS.length) % MISHARY_AL_AFASY_RECITATIONS.length;
    playTrack(MISHARY_AL_AFASY_RECITATIONS[prevIndex]);
  };

  const filteredRecitations = MISHARY_AL_AFASY_RECITATIONS.filter(r => 
    r.title.includes(searchQuery) || r.reciter.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-32 transition-colors">
      {/* Header */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/amal" className="inline-flex items-center gap-2 text-emerald-100 mb-6 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span>ফিরে যান</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black mb-2">কুরআন তিলাওয়াত</h1>
              <p className="text-emerald-100/80 font-medium">মধুর কণ্ঠে পবিত্র কুরআনের তিলাওয়াত শুনুন</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
              <input 
                type="text" 
                placeholder="সূরা বা ক্বারী খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-emerald-200/50 outline-none focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="flex flex-col gap-8">
          
          {/* Now Playing Section (Top) */}
          <div ref={playerRef} className="w-full">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl shadow-emerald-900/5 border border-emerald-50 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-48 h-48 md:w-40 md:h-40 shrink-0 rounded-[2rem] overflow-hidden shadow-2xl">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                    Now Playing
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 dark:text-slate-100 mb-1">{currentTrack.title}</h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{currentTrack.reciter}</p>
                  </div>
                  <div className="flex justify-center md:justify-end gap-2">
                    <button className="p-2 bg-gray-50 dark:bg-slate-800 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 bg-gray-50 dark:bg-slate-800 rounded-full text-gray-400 hover:text-emerald-500 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Progress Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden relative group cursor-pointer">
                    <motion.div 
                      className="h-full bg-emerald-500 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-6">
                  <button 
                    onClick={playPrevious}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <SkipBack size={24} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                      <Pause size={28} />
                    ) : (
                      <Play size={28} className="ml-1" />
                    )}
                  </button>
                  <button 
                    onClick={playNext}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xl font-black text-gray-800 dark:text-slate-100 flex items-center gap-2">
                <ListMusic className="text-emerald-600" />
                প্লেলিস্ট
              </h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredRecitations.length} টি সূরা</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRecitations.map((track) => (
                <motion.button
                  key={track.id}
                  whileHover={{ y: -2 }}
                  onClick={() => playTrack(track)}
                  className={`w-full p-4 rounded-3xl border transition-all flex items-center justify-between group ${
                    currentTrack.id === track.id 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-md' 
                      : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-emerald-100 dark:hover:border-emerald-900'
                  }`}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-sm shrink-0">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {currentTrack.id === track.id && isPlaying && (
                        <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center">
                          <div className="flex gap-0.5 items-end h-4">
                            <div className="w-1 bg-white animate-[music-bar_0.6s_ease-in-out_infinite]"></div>
                            <div className="w-1 bg-white animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
                            <div className="w-1 bg-white animate-[music-bar_0.5s_ease-in-out_infinite]"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-left truncate">
                      <h4 className={`font-black truncate ${currentTrack.id === track.id ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-800 dark:text-slate-200'}`}>
                        {track.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 truncate">{track.reciter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      currentTrack.id === track.id ? 'bg-emerald-500 text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 group-hover:text-emerald-500'
                    }`}>
                      {currentTrack.id === track.id && isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mini Player (Sticky at bottom) */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-50 pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={isPlaying ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          className="max-w-2xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-2 shadow-2xl pointer-events-auto flex items-center gap-4 relative overflow-hidden"
        >
          {/* Mini Progress Bar at top of mini player */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-slate-800">
            <motion.div 
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shrink-0 mt-1">
            <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-black text-gray-800 dark:text-slate-100 truncate">{currentTrack.title}</h4>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold truncate">{currentTrack.reciter}</p>
          </div>
          <div className="flex items-center gap-2 pr-2">
            <button 
              onClick={playPrevious}
              className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <SkipBack size={18} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            <button 
              onClick={playNext}
              className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        preload="auto"
        onEnded={playNext}
        onPlay={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          alert("অডিও লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন।");
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}} />
    </div>
  );
}
