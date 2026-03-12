import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Info, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Qibla() {
  const [rotation, setRotation] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);

  useEffect(() => {
    // Attempt to get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Calculate Qibla direction (simplified formula)
          // Kaaba coordinates: 21.4225° N, 39.8262° E
          const kaabaLat = 21.4225 * (Math.PI / 180);
          const kaabaLng = 39.8262 * (Math.PI / 180);
          const myLat = latitude * (Math.PI / 180);
          const myLng = longitude * (Math.PI / 180);
          
          const y = Math.sin(kaabaLng - myLng);
          const x = Math.cos(myLat) * Math.sin(kaabaLat) - Math.sin(myLat) * Math.cos(kaabaLat) * Math.cos(kaabaLng - myLng);
          let qibla = Math.atan2(y, x) * (180 / Math.PI);
          qibla = (qibla + 360) % 360;
          setQiblaDirection(qibla);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Handle device orientation if available
    const handleOrientation = (event: any) => {
      if (event.webkitCompassHeading) {
        setRotation(event.webkitCompassHeading);
      } else if (event.alpha) {
        setRotation(360 - event.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const convertToBangla = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : banglaDigits[digit];
    }).join('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24">
      <div className="bg-emerald-700 dark:bg-emerald-900 py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Compass size={200} className="absolute -top-10 -right-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">কিবলা কম্পাস</h1>
        <p className="text-emerald-100 opacity-90 relative z-10">সঠিক কিবলার দিক নির্ণয় করুন</p>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col items-center">
          
          {/* Compass Visualization */}
          <div className="relative w-64 h-64 mb-8">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-gray-100 dark:border-slate-800 rounded-full"></div>
            
            {/* Compass Plate */}
            <motion.div 
              animate={{ rotate: -rotation }}
              transition={{ type: "spring", stiffness: 50 }}
              className="absolute inset-4 rounded-full bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center border border-gray-100 dark:border-slate-700 shadow-inner"
            >
              {/* Cardinal Points */}
              <span className="absolute top-2 font-black text-gray-400 dark:text-slate-600">N</span>
              <span className="absolute bottom-2 font-black text-gray-400 dark:text-slate-600">S</span>
              <span className="absolute left-2 font-black text-gray-400 dark:text-slate-600">W</span>
              <span className="absolute right-2 font-black text-gray-400 dark:text-slate-600">E</span>

              {/* Qibla Indicator (Kaaba) */}
              {qiblaDirection !== null && (
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `rotate(${qiblaDirection}deg)` }}
                >
                  <div className="absolute top-0 flex flex-col items-center -translate-y-6">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                      <Compass size={20} />
                    </div>
                    <div className="w-1 h-12 bg-emerald-600 mt-1"></div>
                  </div>
                </div>
              )}

              {/* Center Pin */}
              <div className="w-4 h-4 bg-gray-800 dark:bg-white rounded-full z-30 shadow-md"></div>
            </motion.div>

            {/* Static Pointer (Phone Top) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
              <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">আপনার অবস্থান</p>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                  {location ? `${convertToBangla(location.lat.toFixed(2))}° N, ${convertToBangla(location.lng.toFixed(2))}° E` : 'অবস্থান লোড হচ্ছে...'}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-slate-400">
                <RotateCw size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">কিবলার কোণ</p>
                <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                  {qiblaDirection !== null ? `${convertToBangla(Math.round(qiblaDirection))}°` : 'হিসাব করা হচ্ছে...'}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/30 flex gap-3">
            <Info size={20} className="text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              সঠিক দিক পেতে আপনার ফোনটি সমতল স্থানে রাখুন এবং ধাতব বস্তু থেকে দূরে থাকুন। সবুজ আইকনটি কিবলার দিক নির্দেশ করে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
