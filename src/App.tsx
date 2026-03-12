import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Prophets from './pages/Prophets';
import Hadith from './pages/Hadith';
import JannahJahannam from './pages/JannahJahannam';
import History from './pages/History';
import AsmaulHusna from './pages/AsmaulHusna';
import HafiziTilawat from './pages/HafiziTilawat';
import Ilm from './pages/Ilm';
import Amal from './pages/Amal';
import PrayerTimes from './pages/PrayerTimes';
import Tasbih from './pages/Tasbih';
import Recitation from './pages/Recitation';
import Seba from './pages/Seba';
import Bibidh from './pages/Bibidh';
import Qibla from './pages/Qibla';
import Muhasabah from './pages/Muhasabah';
import HajjUmrah from './pages/HajjUmrah';
import QuranLearning from './pages/QuranLearning';
import PrayerLearning from './pages/PrayerLearning';
import Surahs from './pages/Surahs';
import Zakat from './pages/Zakat';
import Investment from './pages/Investment';
import Admin from './pages/Admin';
import FindMosque from './pages/FindMosque';
import Calendar from './pages/Calendar';
import EndTimesHistory from './pages/EndTimesHistory';
import IslamicNames from './pages/IslamicNames';
import ImportantDays from './pages/ImportantDays';
import LiveClock from './components/LiveClock';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!isHome && <LiveClock />}
      {!isHome && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prophets" element={<Prophets />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/jannah-jahannam" element={<JannahJahannam />} />
          <Route path="/history" element={<History />} />
          <Route path="/end-times" element={<EndTimesHistory />} />
          <Route path="/asmaul-husna" element={<AsmaulHusna />} />
          <Route path="/hafizi-tilawat" element={<HafiziTilawat />} />
          <Route path="/surahs" element={<Surahs />} />
          <Route path="/ilm" element={<Ilm />} />
          <Route path="/amal" element={<Amal />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/tasbih" element={<Tasbih />} />
          <Route path="/recitation" element={<Recitation />} />
          <Route path="/seba" element={<Seba />} />
          <Route path="/bibidh" element={<Bibidh />} />
          <Route path="/qibla" element={<Qibla />} />
          <Route path="/muhasabah" element={<Muhasabah />} />
          <Route path="/hajj-umrah" element={<HajjUmrah />} />
          <Route path="/quran-learning" element={<QuranLearning />} />
          <Route path="/prayer-learning" element={<PrayerLearning />} />
          <Route path="/zakat" element={<Zakat />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/find-mosque" element={<FindMosque />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/important-days" element={<ImportantDays />} />
          <Route path="/names" element={<IslamicNames />} />
        </Routes>
      </main>
      {!isHome && (
        <footer className="bg-emerald-900 text-emerald-100 py-8 text-center pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <p className="mb-2 text-lg font-bold">দ্বীন শিক্ষা</p>
            <p className="text-sm opacity-70">© ২০২৬ সর্বস্বত্ব সংরক্ষিত। সদকা-এ-জারিয়া হিসেবে তৈরি।</p>
            <div className="mt-4">
              <a href="/admin" className="text-xs text-emerald-300 hover:text-white underline opacity-50 hover:opacity-100 transition-opacity">
                অ্যাডমিন প্যানেল
              </a>
            </div>
          </div>
        </footer>
      )}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
