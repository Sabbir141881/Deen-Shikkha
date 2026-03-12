export interface Mosque {
  id: string;
  name: string;
  district: string;
  location: string;
  description?: string;
  image?: string;
}

export const MOSQUES_DATA: Mosque[] = [
  // Dhaka
  {
    id: 'dhaka-1',
    name: 'বায়তুল মোকাররম জাতীয় মসজিদ',
    district: 'ঢাকা',
    location: 'পল্টন, ঢাকা',
    description: 'বাংলাদেশের জাতীয় মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Baitul_Mukarram_National_Mosque_of_Bangladesh.jpg/1200px-Baitul_Mukarram_National_Mosque_of_Bangladesh.jpg'
  },
  {
    id: 'dhaka-2',
    name: 'তারা মসজিদ',
    district: 'ঢাকা',
    location: 'আরমানিটোলা, পুরান ঢাকা',
    description: 'মুঘল স্থাপত্যশৈলীর অন্যতম নিদর্শন।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Star_Mosque_03.jpg/1200px-Star_Mosque_03.jpg'
  },
  {
    id: 'dhaka-3',
    name: 'চকবাজার শাহী মসজিদ',
    district: 'ঢাকা',
    location: 'চকবাজার, পুরান ঢাকা',
    description: 'মুঘল সুবাদার শায়েস্তা খাঁ কর্তৃক নির্মিত।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chawk_Mosque_Dhaka.jpg/1200px-Chawk_Mosque_Dhaka.jpg'
  },
  {
    id: 'dhaka-4',
    name: 'সাত গম্বুজ মসজিদ',
    district: 'ঢাকা',
    location: 'মোহাম্মদপুর, ঢাকা',
    description: 'মুঘল আমলের একটি ঐতিহাসিক মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Sat_Gombuj_Mosque.jpg/1200px-Sat_Gombuj_Mosque.jpg'
  },
  {
    id: 'dhaka-5',
    name: 'বিনত বিবির মসজিদ',
    district: 'ঢাকা',
    location: 'নারিন্দা, ঢাকা',
    description: 'ঢাকার সবচেয়ে পুরনো মসজিদগুলোর একটি।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Binat_Bibi_Mosque.jpg/1200px-Binat_Bibi_Mosque.jpg'
  },
  {
    id: 'dhaka-6',
    name: 'লালবাগ কেল্লা মসজিদ',
    district: 'ঢাকা',
    location: 'লালবাগ, ঢাকা',
    description: 'লালবাগ কেল্লার অভ্যন্তরে অবস্থিত ঐতিহাসিক মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lalbagh_Fort_Mosque.jpg/1200px-Lalbagh_Fort_Mosque.jpg'
  },
  {
    id: 'dhaka-7',
    name: 'খান মোহাম্মদ মৃধা মসজিদ',
    district: 'ঢাকা',
    location: 'লালবাগ, ঢাকা',
    description: 'একটি ঐতিহাসিক মুঘল মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Khan_Mohammad_Mridha_Mosque.jpg/1200px-Khan_Mohammad_Mridha_Mosque.jpg'
  },
  {
    id: 'dhaka-8',
    name: 'গুলশান সোসাইটি মসজিদ',
    district: 'ঢাকা',
    location: 'গুলশান, ঢাকা',
    description: 'আধুনিক স্থাপত্যশৈলীর অনন্য নিদর্শন।',
    image: 'https://archdaily.com/900000/gulshan-society-jame-mosque-kashef-chowdhury-urbana/5b7b6e9ff197cc4e7400003f-gulshan-society-jame-mosque-kashef-chowdhury-urbana-photo'
  },
  {
    id: 'dhaka-9',
    name: 'কাকরাইল মসজিদ',
    district: 'ঢাকা',
    location: 'কাকরাইল, ঢাকা',
    description: 'তাবলিগ জামাতের মারকাজ মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kakrail_Mosque.jpg/1200px-Kakrail_Mosque.jpg'
  },
  {
    id: 'dhaka-10',
    name: 'সোবহানবাগ জামে মসজিদ',
    district: 'ঢাকা',
    location: 'সোবহানবাগ, ঢাকা',
    description: 'ধানমন্ডি এলাকার একটি জনপ্রিয় মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },
  {
    id: 'dhaka-11',
    name: 'গাওসুল আজম মসজিদ',
    district: 'ঢাকা',
    location: 'মহাখালী, ঢাকা',
    description: 'একটি সুন্দর ও বড় মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },
  {
    id: 'dhaka-12',
    name: 'বায়তুল আমান জামে মসজিদ',
    district: 'ঢাকা',
    location: 'ফরিদপুর (ঢাকায় অবস্থিত শাখা)',
    description: 'একটি সুন্দর মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },
  {
    id: 'dhaka-13',
    name: 'আজিমপুর ছাপড়া মসজিদ',
    district: 'ঢাকা',
    location: 'আজিমপুর, ঢাকা',
    description: 'ঐতিহাসিক একটি মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },
  {
    id: 'dhaka-14',
    name: 'মুসা খান মসজিদ',
    district: 'ঢাকা',
    location: 'ঢাকা বিশ্ববিদ্যালয় এলাকা',
    description: 'মুঘল আমলের মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Musa_Khan_Mosque.jpg/1200px-Musa_Khan_Mosque.jpg'
  },
  {
    id: 'dhaka-15',
    name: 'হাজী শাহবাজ খান মসজিদ',
    district: 'ঢাকা',
    location: 'সোহরাওয়ার্দী উদ্যান, ঢাকা',
    description: 'তিন গম্বুজ বিশিষ্ট ঐতিহাসিক মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Haji_Shahbaz_Khan_Mosque.jpg/1200px-Haji_Shahbaz_Khan_Mosque.jpg'
  },

  // Chittagong
  {
    id: 'chittagong-1',
    name: 'আন্দরকিল্লা শাহী জামে মসজিদ',
    district: 'চট্টগ্রাম',
    location: 'আন্দরকিল্লা, চট্টগ্রাম',
    description: 'মুঘল স্থাপত্যশৈলীর নিদর্শন।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Anderkilla_Shahi_Jame_Mosque.jpg/1200px-Anderkilla_Shahi_Jame_Mosque.jpg'
  },
  {
    id: 'chittagong-2',
    name: 'চন্দনপুরা মসজিদ',
    district: 'চট্টগ্রাম',
    location: 'চন্দনপুরা, চট্টগ্রাম',
    description: 'বহু গম্বুজ বিশিষ্ট দৃষ্টিনন্দন মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chandanpura_Mosque.jpg/1200px-Chandanpura_Mosque.jpg'
  },
  {
    id: 'chittagong-3',
    name: 'জমিয়াতুল ফালাহ মসজিদ',
    district: 'চট্টগ্রাম',
    location: 'দামপাড়া, চট্টগ্রাম',
    description: 'চট্টগ্রামের অন্যতম প্রধান মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Jamiatul_Falah_Mosque.jpg/1200px-Jamiatul_Falah_Mosque.jpg'
  },
  {
    id: 'chittagong-4',
    name: 'বায়েজিদ বোস্তামী মাজার মসজিদ',
    district: 'চট্টগ্রাম',
    location: 'নাসিরাবাদ, চট্টগ্রাম',
    description: 'ঐতিহাসিক মাজার সংলগ্ন মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bayazid_Bostami_Mazar_Mosque.jpg/1200px-Bayazid_Bostami_Mazar_Mosque.jpg'
  },

  // Khulna
  {
    id: 'khulna-1',
    name: 'ষাট গম্বুজ মসজিদ',
    district: 'বাগেরহাট',
    location: 'বাগেরহাট সদর',
    description: 'ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট। খান জাহান আলী নির্মিত।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sixty_Dome_Mosque.jpg/1200px-Sixty_Dome_Mosque.jpg'
  },
  {
    id: 'khulna-2',
    name: 'নয় গম্বুজ মসজিদ',
    district: 'বাগেরহাট',
    location: 'বাগেরহাট',
    description: 'খান জাহান আলীর আমলের আরেকটি নিদর্শন।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Nine_Dome_Mosque.jpg/1200px-Nine_Dome_Mosque.jpg'
  },
  {
    id: 'khulna-3',
    name: 'শহীদ হাদিস পার্ক মসজিদ',
    district: 'খুলনা',
    location: 'খুলনা সদর',
    description: 'খুলনা শহরের একটি পরিচিত মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },

  // Rajshahi
  {
    id: 'rajshahi-1',
    name: 'ছোট সোনা মসজিদ',
    district: 'চাঁপাইনবাবগঞ্জ',
    location: 'শিবগঞ্জ, চাঁপাইনবাবগঞ্জ',
    description: 'সুলতানি আমলের স্থাপত্য নিদর্শন।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Choto_Sona_Mosque.jpg/1200px-Choto_Sona_Mosque.jpg'
  },
  {
    id: 'rajshahi-2',
    name: 'বাঘা মসজিদ',
    district: 'রাজশাহী',
    location: 'বাঘা, রাজশাহী',
    description: 'পোড়ামাটির অলঙ্করণ সমৃদ্ধ ঐতিহাসিক মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bagha_Mosque.jpg/1200px-Bagha_Mosque.jpg'
  },
  {
    id: 'rajshahi-3',
    name: 'কুসুম্বা মসজিদ',
    district: 'নওগাঁ',
    location: 'মান্দা, নওগাঁ',
    description: 'পাঁচ টাকার নোটে এই মসজিদের ছবি আছে।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kusumba_Mosque.jpg/1200px-Kusumba_Mosque.jpg'
  },

  // Barisal
  {
    id: 'barisal-1',
    name: 'বাইতুল আমান জামে মসজিদ (গুঠিয়া মসজিদ)',
    district: 'বরিশাল',
    location: 'উজিরপুর, বরিশাল',
    description: 'আধুনিক স্থাপত্যের অনন্য নিদর্শন।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Guthia_Mosque.jpg/1200px-Guthia_Mosque.jpg'
  },
  {
    id: 'barisal-2',
    name: 'কসবা মসজিদ',
    district: 'বরিশাল',
    location: 'গৌরনদী, বরিশাল',
    description: 'প্রাচীন আমলের মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },

  // Sylhet
  {
    id: 'sylhet-1',
    name: 'শাহ জালাল (রহ.) মাজার মসজিদ',
    district: 'সিলেট',
    location: 'দরগাহ মহল্লা, সিলেট',
    description: 'হযরত শাহ জালাল (রহ.) এর মাজার সংলগ্ন মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Shah_Jalal_Mazar_Mosque.jpg/1200px-Shah_Jalal_Mazar_Mosque.jpg'
  },
  {
    id: 'sylhet-2',
    name: 'শাহ পরান (রহ.) মাজার মসজিদ',
    district: 'সিলেট',
    location: 'খাদিম নগর, সিলেট',
    description: 'হযরত শাহ পরান (রহ.) এর মাজার সংলগ্ন মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Shah_Paran_Mazar_Mosque.jpg/1200px-Shah_Paran_Mazar_Mosque.jpg'
  },

  // Rangpur
  {
    id: 'rangpur-1',
    name: 'কেরামত আলী জামে মসজিদ',
    district: 'রংপুর',
    location: 'মুন্সিপাড়া, রংপুর',
    description: 'ঐতিহাসিক ও দৃষ্টিনন্দন মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Keramat_Ali_Jame_Mosque.jpg/1200px-Keramat_Ali_Jame_Mosque.jpg'
  },
  {
    id: 'rangpur-2',
    name: 'মিঠাপুকুর বড় মসজিদ',
    district: 'রংপুর',
    location: 'মিঠাপুকুর, রংপুর',
    description: 'মুঘল আমলের মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mithapukur_Boro_Mosque.jpg/1200px-Mithapukur_Boro_Mosque.jpg'
  },
  {
    id: 'dinajpur-1',
    name: 'কান্তজিউ মন্দির সংলগ্ন মসজিদ (নয়াবাদ মসজিদ)',
    district: 'দিনাজপুর',
    location: 'কাহারোল, দিনাজপুর',
    description: 'ঐতিহাসিক নয়াবাদ মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nayabad_Mosque.jpg/1200px-Nayabad_Mosque.jpg'
  },

  // Mymensingh
  {
    id: 'mymensingh-1',
    name: 'বড় মসজিদ',
    district: 'ময়মনসিংহ',
    location: 'চরপাড়া, ময়মনসিংহ',
    description: 'শহরের অন্যতম প্রধান মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },

  // Comilla
  {
    id: 'comilla-1',
    name: 'শাহ সুজা মসজিদ',
    district: 'কুমিল্লা',
    location: 'কুমিল্লা',
    description: 'মুঘল সুবাদার শাহ সুজা নির্মিত।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Shah_Shuja_Mosque.jpg/1200px-Shah_Shuja_Mosque.jpg'
  },

  // Tangail
  {
    id: 'tangail-1',
    name: '২০১ গম্বুজ মসজিদ',
    district: 'টাঙ্গাইল',
    location: 'গোপালপুর, টাঙ্গাইল',
    description: 'বিশ্বের সবচেয়ে বেশি গম্বুজ বিশিষ্ট ইটের তৈরি মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/201_Dome_Mosque.jpg/1200px-201_Dome_Mosque.jpg'
  },
  {
    id: 'tangail-2',
    name: 'আতিয়া মসজিদ',
    district: 'টাঙ্গাইল',
    location: 'দেলদুয়ার, টাঙ্গাইল',
    description: '১০ টাকার নোটে এই মসজিদের ছবি ছিল।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Atia_Mosque.jpg/1200px-Atia_Mosque.jpg'
  },

  // Munshiganj
  {
    id: 'munshiganj-1',
    name: 'বাবা আদম মসজিদ',
    district: 'মুন্সীগঞ্জ',
    location: 'রামপাল, মুন্সীগঞ্জ',
    description: 'সুলতানি আমলের মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Baba_Adam_Mosque.jpg/1200px-Baba_Adam_Mosque.jpg'
  },

  // Narayanganj
  {
    id: 'narayanganj-1',
    name: 'গোয়ালদী মসজিদ',
    district: 'নারায়ণগঞ্জ',
    location: 'সোনারগাঁও, নারায়ণগঞ্জ',
    description: 'সুলতানি আমলের এক গম্বুজ বিশিষ্ট মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Goaldi_Mosque.jpg/1200px-Goaldi_Mosque.jpg'
  },

  // Feni
  {
    id: 'feni-1',
    name: 'চাঁদগাজী ভূঁইয়া মসজিদ',
    district: 'ফেনী',
    location: 'ছাগলনাইয়া, ফেনী',
    description: 'মুঘল স্থাপত্যশৈলীর মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chandgazi_Bhuiyan_Mosque.jpg/1200px-Chandgazi_Bhuiyan_Mosque.jpg'
  },

  // Kishoreganj
  {
    id: 'kishoreganj-1',
    name: 'শহীদী মসজিদ',
    district: 'কিশোরগঞ্জ',
    location: 'কিশোরগঞ্জ সদর',
    description: 'ঐতিহাসিক মসজিদ।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  },
  {
    id: 'kishoreganj-2',
    name: 'পাগলা মসজিদ',
    district: 'কিশোরগঞ্জ',
    location: 'হারুয়া, কিশোরগঞ্জ',
    description: 'জনপ্রিয় ও ঐতিহাসিক মসজিদ।',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Pagla_Mosque.jpg/1200px-Pagla_Mosque.jpg'
  },

  // Sirajganj
  {
    id: 'sirajganj-1',
    name: 'নবরত্ন মন্দির সংলগ্ন মসজিদ',
    district: 'সিরাজগঞ্জ',
    location: 'সিরাজগঞ্জ',
    description: 'ঐতিহাসিক নিদর্শন।',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNq_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q_Q/w408-h306-k-no'
  }
];
