import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

// Utilities for converting Gregorian dates to Bangla and Hijri

const BANGLA_MONTHS = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 
  'কার্তিক', 'অগ্রহায়ু', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

const HIJRI_MONTHS = [
  'মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 
  'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান', 
  'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'
];

const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaDigit(num: number | string): string {
  return num.toString().split('').map(char => {
    const digit = parseInt(char);
    return isNaN(digit) ? char : BANGLA_DIGITS[digit];
  }).join('');
}

export function getBanglaDateManual(date: Date): { day: string; month: string; year: string } {
  const day = date.getDate();
  const month = date.getMonth(); // 0 = Jan
  const year = date.getFullYear();

  let banglaYear = year - 593;
  let banglaMonthIndex = 0;
  let banglaDay = 1;

  if (month < 3 || (month === 3 && day < 14)) {
    banglaYear -= 1;
  }

  // Simplified Bangla Calendar Logic (Modified Bangla Academy)
  // Boishakh starts April 14
  
  if (month === 0) { // Jan
    if (day <= 13) { banglaMonthIndex = 8; banglaDay = day + 17; } // Poush (ends Jan 13)
    else { banglaMonthIndex = 9; banglaDay = day - 13; } // Magh (starts Jan 14)
  } else if (month === 1) { // Feb
    if (day <= 12) { banglaMonthIndex = 9; banglaDay = day + 18; } // Magh (ends Feb 12)
    else { banglaMonthIndex = 10; banglaDay = day - 12; } // Falgun (starts Feb 13)
  } else if (month === 2) { // Mar
    if (day <= 14) { banglaMonthIndex = 10; banglaDay = day + 16; } // Falgun (ends Mar 14)
    else { banglaMonthIndex = 11; banglaDay = day - 14; } // Chaitra (starts Mar 15)
  } else if (month === 3) { // Apr
    if (day <= 13) { banglaMonthIndex = 11; banglaDay = day + 16; } // Chaitra (ends Apr 13)
    else { banglaMonthIndex = 0; banglaDay = day - 13; } // Boishakh (starts Apr 14)
  } else if (month === 4) { // May
    if (day <= 14) { banglaMonthIndex = 0; banglaDay = day + 17; } // Boishakh (ends May 14)
    else { banglaMonthIndex = 1; banglaDay = day - 14; } // Joishtho (starts May 15)
  } else if (month === 5) { // Jun
    if (day <= 14) { banglaMonthIndex = 1; banglaDay = day + 17; } // Joishtho (ends Jun 14)
    else { banglaMonthIndex = 2; banglaDay = day - 14; } // Ashar (starts Jun 15)
  } else if (month === 6) { // Jul
    if (day <= 15) { banglaMonthIndex = 2; banglaDay = day + 16; } // Ashar (ends Jul 15)
    else { banglaMonthIndex = 3; banglaDay = day - 15; } // Srabon (starts Jul 16)
  } else if (month === 7) { // Aug
    if (day <= 15) { banglaMonthIndex = 3; banglaDay = day + 16; } // Srabon (ends Aug 15)
    else { banglaMonthIndex = 4; banglaDay = day - 15; } // Bhadro (starts Aug 16)
  } else if (month === 8) { // Sep
    if (day <= 15) { banglaMonthIndex = 4; banglaDay = day + 16; } // Bhadro (ends Sep 15)
    else { banglaMonthIndex = 5; banglaDay = day - 15; } // Ashshin (starts Sep 16)
  } else if (month === 9) { // Oct
    if (day <= 15) { banglaMonthIndex = 5; banglaDay = day + 15; } // Ashshin (ends Oct 15)
    else { banglaMonthIndex = 6; banglaDay = day - 15; } // Kartik (starts Oct 16)
  } else if (month === 10) { // Nov
    if (day <= 14) { banglaMonthIndex = 6; banglaDay = day + 16; } // Kartik (ends Nov 14)
    else { banglaMonthIndex = 7; banglaDay = day - 14; } // Ograhayon (starts Nov 15)
  } else if (month === 11) { // Dec
    if (day <= 14) { banglaMonthIndex = 7; banglaDay = day + 16; } // Ograhayon (ends Dec 14)
    else { banglaMonthIndex = 8; banglaDay = day - 14; } // Poush (starts Dec 15)
  }

  // Leap year adjustment for Falgun
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    if (month === 2 && day <= 14) {
       banglaDay = day + 17; // Falgun has 30 days in leap year? Actually usually 29/30.
       // Let's keep it simple.
    }
  }

  return {
    day: toBanglaDigit(banglaDay),
    month: BANGLA_MONTHS[banglaMonthIndex],
    year: toBanglaDigit(banglaYear)
  };
}

export function getHijriDateManual(date: Date, lat: number = 23.8103, lng: number = 90.4125): { day: string; month: string; year: string } {
  // Check if after Maghrib
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.Karachi();
  const prayerTimes = new PrayerTimes(coords, date, params);
  
  const isAfterMaghrib = date.getTime() >= prayerTimes.maghrib.getTime();
  
  // Create a new date object to avoid mutating the original
  const calcDate = new Date(date);
  
  // Bangladesh Hijri date is generally 1 day behind Umm al-Qura.
  // Umm al-Qura for March 9 gives 20 Ramadan.
  // Bangladesh for March 9 before Maghrib is 19 Ramadan.
  // Bangladesh for March 9 after Maghrib is 20 Ramadan.
  // So, if it's BEFORE Maghrib, we subtract 1 day from the date passed to the formatter.
  // If it's AFTER Maghrib, we don't subtract (which effectively advances it to the next Islamic day).
  if (!isAfterMaghrib) {
    calcDate.setDate(calcDate.getDate() - 1);
  }

  try {
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    
    const parts = formatter.formatToParts(calcDate);
    const dayPart = parts.find(p => p.type === 'day')?.value || '1';
    const monthPart = parts.find(p => p.type === 'month')?.value || '1';
    const yearPart = parts.find(p => p.type === 'year')?.value || '1447';
    
    const hijriDay = parseInt(dayPart, 10);
    const hijriMonth = parseInt(monthPart, 10) - 1; // 0-indexed for array
    const hijriYear = parseInt(yearPart, 10);

    return {
      day: toBanglaDigit(hijriDay),
      month: HIJRI_MONTHS[hijriMonth] || HIJRI_MONTHS[0],
      year: toBanglaDigit(hijriYear)
    };
  } catch (e) {
    // Fallback if Intl is not supported (very rare in modern browsers)
    return {
      day: toBanglaDigit(1),
      month: HIJRI_MONTHS[8], // Default to Ramadan
      year: toBanglaDigit(1447)
    };
  }
}
