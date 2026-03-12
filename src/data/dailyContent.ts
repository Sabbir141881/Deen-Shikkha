export interface DailyContent {
  image: string;
  hadith: string;
  source: string;
}

export const ISLAMIC_IMAGES = [
  "https://images.unsplash.com/photo-1542300058-b94b8ab7411b?q=80&w=1000&auto=format&fit=crop", // Mosque
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop", // Islamic Art
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop", // Quran
  "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000&auto=format&fit=crop", // Mosque Interior
  "https://images.unsplash.com/photo-1565035010268-a3816f98589a?q=80&w=1000&auto=format&fit=crop", // Lantern
  "https://images.unsplash.com/photo-1580418827493-f2b22c438544?q=80&w=1000&auto=format&fit=crop", // Madinah
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop", // Dome
  "https://images.unsplash.com/photo-1552423316-6f166986638a?q=80&w=1000&auto=format&fit=crop", // Prayer Beads
  "https://images.unsplash.com/photo-1574630668566-231920875218?q=80&w=1000&auto=format&fit=crop", // Calligraphy
  "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80&w=1000&auto=format&fit=crop", // Blue Mosque
];

export const HADITHS = [
  {
    text: "নিশ্চয়ই সমস্ত কাজ নিয়তের ওপর নির্ভরশীল।",
    source: "সহীহ বুখারী: ১"
  },
  {
    text: "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি যে কুরআন শেখে এবং অন্যকে শেখায়।",
    source: "সহীহ বুখারী: ৫০২৭"
  },
  {
    text: "পবিত্রতা ঈমানের অর্ধেক।",
    source: "সহীহ মুসলিম: ২২৩"
  },
  {
    text: "মুমিন এক গর্তে দুইবার দংশিত হয় না।",
    source: "সহীহ বুখারী: ৬১৩৩"
  },
  {
    text: "যে ব্যক্তি আল্লাহ ও শেষ দিবসের প্রতি ঈমান রাখে, সে যেন তার প্রতিবেশীকে কষ্ট না দেয়।",
    source: "সহীহ বুখারী: ৬০১৮"
  },
  {
    text: "লজ্জা ঈমানের একটি শাখা।",
    source: "সহীহ বুখারী: ৯"
  },
  {
    text: "শক্তিশালী সেই ব্যক্তি নয় যে কুস্তিতে খুব লড়তে পারে, বরং শক্তিশালী সে যে রাগের সময় নিজেকে সামলে রাখতে পারে।",
    source: "সহীহ বুখারী: ৬১১৪"
  },
  {
    text: "যে ব্যক্তি মানুষের প্রতি দয়া করে না, আল্লাহ তার প্রতি দয়া করেন না।",
    source: "সহীহ মুসলিম: ২৩১৯"
  },
  {
    text: "দুনিয়া মুমিনের জন্য কারাগার এবং কাফেরের জন্য জান্নাত।",
    source: "সহীহ মুসলিম: ২৯৫৬"
  },
  {
    text: "তোমরা একে অপরের প্রতি হিংসা করো না, একে অপরের প্রতি বিদ্বেষ পোষণ করো না।",
    source: "সহীহ মুসলিম: ২৫৬৩"
  },
  {
    text: "উত্তম কথা বলাও একটি সদকা।",
    source: "সহীহ বুখারী: ২৯৮৯"
  },
  {
    text: "মজলুমের বদদোয়া থেকে বেঁচে থাকো, কেননা তার এবং আল্লাহর মাঝখানে কোনো পর্দা থাকে না।",
    source: "সহীহ বুখারী: ২৪৪৮"
  },
  {
    text: "যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য বিনয়ী হয়, আল্লাহ তার মর্যাদা বাড়িয়ে দেন।",
    source: "সহীহ মুসলিম: ২৫৮৮"
  },
  {
    text: "আল্লাহ সুন্দর এবং তিনি সৌন্দর্য পছন্দ করেন।",
    source: "সহীহ মুসলিম: ৯১"
  },
  {
    text: "ধৈর্য হলো আলো।",
    source: "সহীহ মুসলিম: ২২৩"
  }
];

export const getDailyContent = (): DailyContent => {
  const today = new Date();
  // Create a seed from the date (e.g., 20231027)
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Use simple modulo arithmetic to cycle through content
  const imageIndex = seed % ISLAMIC_IMAGES.length;
  const hadithIndex = seed % HADITHS.length;

  return {
    image: ISLAMIC_IMAGES[imageIndex],
    hadith: HADITHS[hadithIndex].text,
    source: HADITHS[hadithIndex].source
  };
};
