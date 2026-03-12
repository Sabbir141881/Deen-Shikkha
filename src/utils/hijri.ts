import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export const getHijriDateStr = (date: Date, lat: number = 23.8103, lng: number = 90.4125): string => {
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.Karachi();
  const prayerTimes = new PrayerTimes(coords, date, params);
  
  const maghribTime = prayerTimes.maghrib;
  
  // If current time is after Maghrib, add 1 day to the date for Hijri calculation
  const hijriDate = new Date(date);
  if (date.getTime() >= maghribTime.getTime()) {
    hijriDate.setDate(hijriDate.getDate() + 1);
  }

  try {
    const formatter = new Intl.DateTimeFormat('bn-BD-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    let formatted = formatter.format(hijriDate);
    // Remove "হি." or "AH" if present and append "হিজরি"
    formatted = formatted.replace(/ হি\.| AH/g, '').trim();
    
    // Sometimes the month name might be in English or slightly different, but bn-BD usually handles it.
    // Ensure we append "হিজরি"
    if (!formatted.includes('হিজরি')) {
      formatted += ' হিজরি';
    }
    return formatted;
  } catch (e) {
    // Fallback if Intl.DateTimeFormat with islamic calendar is not supported
    return "হিজরি তারিখ (অসমর্থিত)";
  }
};
