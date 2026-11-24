/**
 * Parent profiling: the Global Teen Panel bank's "Asked to: Parent" questions that Module 1 does
 * not already ask. Shown in the guardian onboarding form after "Staying in touch". The answers are
 * saved to the Teen's own profile (Answer records) when the guardian gives consent.
 *
 * GENERATED from the corrected question bank (question-bank-audit/mongo-ready). Question names (n)
 * and option values are the database's sync keys: never edit them by hand.
 * teen-p001..p007 are not asked here: the backend works them out from Module 1 and the consent.
 */

export const BANK_LANGUAGES = [
  "Afar",
  "Abkhazian",
  "Afrikaans",
  "Akan",
  "Albanian",
  "Amharic",
  "Arabic",
  "Aragonese",
  "Armenian",
  "Assamese",
  "Avaric",
  "Avestan",
  "Aymara",
  "Azerbaijani",
  "Bashkir",
  "Bambara",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bihari languages",
  "Bislama",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Burmese",
  "Catalan",
  "Chamorro",
  "Chechen",
  "Chinese",
  "Church Slavic",
  "Chuvash",
  "Cornish",
  "Corsican",
  "Cree",
  "Czech",
  "Danish",
  "Divehi",
  "Dutch",
  "Dzongkha",
  "English",
  "Esperanto",
  "Estonian",
  "Ewe",
  "Faroese",
  "Fijian",
  "Finnish",
  "French",
  "Western Frisian",
  "Fulah",
  "Georgian",
  "German",
  "Gaelic",
  "Irish",
  "Galician",
  "Manx",
  "Greek Modern (1453-)",
  "Guarani",
  "Gujarati",
  "Haitian",
  "Hausa",
  "Hebrew",
  "Herero",
  "Hindi",
  "Hiri Motu",
  "Croatian",
  "Hungarian",
  "Igbo",
  "Icelandic",
  "Ido",
  "Sichuan Yi",
  "Inuktitut",
  "Interlingue",
  "Interlingua (International Auxiliary Language Association)",
  "Indonesian",
  "Inupiaq",
  "Italian",
  "Javanese",
  "Japanese",
  "Kalaallisut",
  "Kannada",
  "Kashmiri",
  "Kanuri",
  "Kazakh",
  "Central Khmer",
  "Kikuyu",
  "Kinyarwanda",
  "Kirghiz",
  "Komi",
  "Kongo",
  "Korean",
  "Kuanyama",
  "Kurdish",
  "Lao",
  "Latin",
  "Latvian",
  "Limburgan",
  "Lingala",
  "Lithuanian",
  "Luxembourgish",
  "Luba-Katanga",
  "Ganda",
  "Macedonian",
  "Marshallese",
  "Malayalam",
  "Maori",
  "Marathi",
  "Malay",
  "Malagasy",
  "Maltese",
  "Mongolian",
  "Nauru",
  "Navajo",
  "Ndebele South",
  "Ndebele North",
  "Ndonga",
  "Nepali",
  "Norwegian Nynorsk",
  "Bokmål Norwegian",
  "Norwegian",
  "Chichewa",
  "Occitan (post 1500)",
  "Ojibwa",
  "Oriya",
  "Oromo",
  "Ossetian",
  "Panjabi",
  "Persian",
  "Pali",
  "Polish",
  "Portuguese",
  "Pushto",
  "Quechua",
  "Romansh",
  "Romanian",
  "Rundi",
  "Russian",
  "Sango",
  "Sanskrit",
  "Sinhala",
  "Slovak",
  "Slovenian",
  "Northern Sami",
  "Samoan",
  "Shona",
  "Sindhi",
  "Somali",
  "Sotho Southern",
  "Spanish",
  "Sardinian",
  "Serbian",
  "Swati",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tahitian",
  "Tamil",
  "Tatar",
  "Telugu",
  "Tajik",
  "Tagalog",
  "Thai",
  "Tibetan",
  "Tigrinya",
  "Tonga (Tonga Islands)",
  "Tswana",
  "Tsonga",
  "Turkmen",
  "Turkish",
  "Twi",
  "Uighur",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Venda",
  "Vietnamese",
  "Volapük",
  "Welsh",
  "Walloon",
  "Wolof",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zhuang",
  "Zulu"
].map((v) => [v, v]);

// household-income options by the country code in P01
export const INCOME_BY_COUNTRY = {
  "AU": [
    "up to 30000",
    "30000 - 49999",
    "50000 - 74999",
    "75000 - 99999",
    "100000 - 124999",
    "125000 - 149999",
    "150000 - 174999",
    "175000 - 199999",
    "200000 - 249999",
    "250000 and above"
  ],
  "MY": [
    "up to 30000",
    "30000 - 49999",
    "50000 - 69999",
    "70000 - 89999",
    "90000 - 119999",
    "120000 - 159999",
    "160000 - 219999",
    "220000 - 299999",
    "300000 - 449999",
    "450000 and above"
  ],
  "AT": [
    "up to 30000",
    "100000 - 129999",
    "130000 - 169999",
    "170000 - 219999",
    "220000 - 299999",
    "30000 - 44999",
    "45000 - 59999",
    "60000 - 79999",
    "80000 - 99999",
    "300000 and above"
  ],
  "US": [
    "up to 30000",
    "30000 - 49999",
    "50000 - 74999",
    "75000 - 99999",
    "100000 - 149999",
    "150000 - 199999",
    "200000 - 299999",
    "500000 - 749999",
    "300000 - 499999",
    "750000 and above"
  ],
  "NZ": [
    "200000 - 249999",
    "up to 35000",
    "35000 - 59999",
    "60000 - 84999",
    "85000 - 109999",
    "110000 - 139999",
    "140000 - 169999",
    "170000 - 199999",
    "250000 - 349999",
    "350000 and above"
  ],
  "CA": [
    "up to 35000",
    "35000 - 59999",
    "350000 - 499999",
    "500000 and above",
    "90000 - 119999",
    "120000 - 159999",
    "60000 - 89999",
    "160000 - 199999",
    "200000 - 259999",
    "260000 - 349999"
  ],
  "PE": [
    "60000 - 84999",
    "85000 - 109999",
    "150000 - 199999",
    "up to 24000",
    "24000 - 39999",
    "40000 - 59999",
    "110000 - 149999",
    "400000 and above",
    "200000 - 279999",
    "280000 - 399999"
  ],
  "ES": [
    "85000 - 109999",
    "30000 - 44999",
    "300000 and above",
    "up to 18000",
    "18000 - 29999",
    "110000 - 149999",
    "45000 - 64999",
    "65000 - 84999",
    "150000 - 209999",
    "210000 - 299999"
  ],
  "NL": [
    "85000 - 109999",
    "45000 - 64999",
    "65000 - 84999",
    "up to 26000",
    "26000 - 44999",
    "110000 - 144999",
    "145000 - 189999",
    "190000 - 259999",
    "260000 - 379999",
    "380000 and above"
  ],
  "DE": [
    "250000 - 349999",
    "350000 and above",
    "60000 - 79999",
    "up to 24000",
    "24000 - 39999",
    "40000 - 59999",
    "80000 - 104999",
    "105000 - 139999",
    "140000 - 184999",
    "185000 - 249999"
  ],
  "GB": [
    "350000 and above",
    "50000 - 69999",
    "70000 - 89999",
    "90000 - 119999",
    "120000 - 159999",
    "up to 20000",
    "20000 - 34999",
    "35000 - 49999",
    "160000 - 224999",
    "225000 - 349999"
  ],
  "FR": [
    "350000 and above",
    "up to 22000",
    "22000 - 37999",
    "38000 - 54999",
    "55000 - 74999",
    "75000 - 94999",
    "95000 - 124999",
    "125000 - 164999",
    "165000 - 229999",
    "230000 - 349999"
  ],
  "SG": [
    "up to 40000",
    "40000 - 69999",
    "70000 - 99999",
    "100000 - 129999",
    "130000 - 169999",
    "170000 - 219999",
    "220000 - 279999",
    "280000 - 349999",
    "350000 - 499999",
    "500000 and above"
  ],
  "CH": [
    "70000 - 99999",
    "450000 - 649999",
    "up to 45000",
    "45000 - 69999",
    "100000 - 139999",
    "140000 - 179999",
    "180000 - 239999",
    "240000 - 319999",
    "320000 - 449999",
    "650000 and above"
  ],
  "PL": [
    "130000 - 169999",
    "up to 36000",
    "36000 - 59999",
    "60000 - 89999",
    "90000 - 129999",
    "170000 - 229999",
    "230000 - 299999",
    "300000 - 419999",
    "420000 - 599999",
    "600000 and above"
  ],
  "RO": [
    "130000 - 169999",
    "up to 36000",
    "36000 - 59999",
    "60000 - 89999",
    "90000 - 129999",
    "170000 - 229999",
    "230000 - 299999",
    "300000 - 419999",
    "420000 - 599999",
    "600000 and above"
  ],
  "CN": [
    "up to 60000",
    "60000 - 99999",
    "100000 - 149999",
    "150000 - 199999",
    "200000 - 299999",
    "300000 - 399999",
    "400000 - 549999",
    "550000 - 749999",
    "750000 - 999999",
    "1000000 and above"
  ],
  "BG": [
    "150000 - 199999",
    "200000 - 299999",
    "60000 - 79999",
    "300000 and above",
    "up to 18000",
    "18000 - 29999",
    "30000 - 41999",
    "42000 - 59999",
    "80000 - 109999",
    "110000 - 149999"
  ],
  "IL": [
    "200000 - 299999",
    "750000 - 999999",
    "1400000 - 1999999",
    "300000 - 419999",
    "up to 120000",
    "120000 - 199999",
    "420000 - 559999",
    "560000 - 749999",
    "1000000 - 1399999",
    "2000000 and above"
  ],
  "DK": [
    "400000 - 549999",
    "up to 250000",
    "250000 - 399999",
    "1900000 - 2499999",
    "550000 - 699999",
    "700000 - 899999",
    "900000 - 1149999",
    "1150000 - 1449999",
    "1450000 - 1899999",
    "2500000 and above"
  ],
  "NO": [
    "550000 - 749999",
    "3500000 and above",
    "up to 350000",
    "350000 - 549999",
    "750000 - 949999",
    "950000 - 1199999",
    "1200000 - 1499999",
    "1500000 - 1899999",
    "1900000 - 2499999",
    "2500000 - 3499999"
  ],
  "TW": [
    "750000 - 999999",
    "up to 500000",
    "500000 - 749999",
    "1000000 - 1249999",
    "1250000 - 1499999",
    "1500000 - 1799999",
    "1800000 - 2199999",
    "2200000 - 2799999",
    "2800000 - 3499999",
    "3500000 and above"
  ],
  "IN": [
    "750000 - 999999",
    "500000 - 749999",
    "3000000 - 4999999",
    "2000000 - 2999999",
    "1500000 - 1999999",
    "up to 300000",
    "300000 - 499999",
    "5000000 - 7499999",
    "7500000 and above",
    "1000000 - 1499999"
  ],
  "RU": [
    "up to 500000",
    "2400000 - 3199999",
    "500000 - 799999",
    "800000 - 1199999",
    "1200000 - 1699999",
    "1700000 - 2399999",
    "3200000 - 4499999",
    "4500000 - 6499999",
    "6500000 - 9999999",
    "10000000 and above"
  ],
  "HK": [
    "1000000 - 1249999",
    "up to 250000",
    "250000 - 399999",
    "400000 - 599999",
    "600000 - 799999",
    "800000 - 999999",
    "1250000 - 1599999",
    "1600000 - 1999999",
    "2000000 - 2999999",
    "3000000 and above"
  ],
  "JP": [
    "up to 3000000",
    "3000000 - 4999999",
    "5000000 - 6999999",
    "7000000 - 8999999",
    "9000000 - 11999999",
    "12000000 - 14999999",
    "15000000 - 19999999",
    "20000000 - 29999999",
    "30000000 - 49999999",
    "50000000 and above"
  ],
  "NG": [
    "5000000 - 6999999",
    "up to 1200000",
    "1200000 - 2399999",
    "2400000 - 3599999",
    "3600000 - 4999999",
    "7000000 - 9999999",
    "10000000 - 14999999",
    "15000000 - 24999999",
    "25000000 - 39999999",
    "40000000 and above"
  ],
  "KH": [
    "20000000 - 29999999",
    "150000000 - 199999999",
    "up to 12000000",
    "12000000 - 19999999",
    "30000000 - 44999999",
    "45000000 - 59999999",
    "60000000 - 79999999",
    "80000000 - 109999999",
    "110000000 - 149999999",
    "200000000 and above"
  ],
  "KR": [
    "30000000 - 49999999",
    "up to 30000000",
    "50000000 - 69999999",
    "70000000 - 89999999",
    "90000000 - 119999999",
    "120000000 - 149999999",
    "150000000 - 199999999",
    "200000000 - 279999999",
    "280000000 - 399999999",
    "400000000 and above"
  ],
  "PH": [
    "600000 - 799999",
    "2000000 - 2999999",
    "3000000 and above",
    "300000 - 449999",
    "up to 180000",
    "180000 - 299999",
    "450000 - 599999",
    "800000 - 1049999",
    "1050000 - 1399999",
    "1400000 - 1999999"
  ],
  "TH": [
    "2000000 - 2999999",
    "3000000 and above",
    "300000 - 449999",
    "up to 180000",
    "180000 - 299999",
    "450000 - 649999",
    "650000 - 849999",
    "850000 - 1099999",
    "1100000 - 1499999",
    "1500000 - 1999999"
  ],
  "EG": [
    "3000000 and above",
    "up to 180000",
    "900000 -  1199999",
    "1200000 -  1599999",
    "180000 -  299999",
    "300000 -  449999",
    "450000 -  649999",
    "650000 -  899999",
    "1600000 -  2199999",
    "2200000 -  2999999"
  ],
  "MX": [
    "3000000 and above",
    "300000 - 449999",
    "up to 180000",
    "180000 - 299999",
    "450000 - 649999",
    "650000 - 849999",
    "850000 - 1099999",
    "1100000 - 1499999",
    "1500000 - 2099999",
    "2100000 - 2999999"
  ],
  "IT": [
    "50000 - 69999",
    "70000 - 89999",
    "90000 - 119999",
    "120000 - 159999",
    "160000 - 219999",
    "up to 20000",
    "20000 - 34999",
    "35000 - 49999",
    "220000 - 319999",
    "320000 and above"
  ],
  "IE": [
    "90000 - 119999",
    "120000 - 159999",
    "up to 28000",
    "28000 - 44999",
    "45000 - 64999",
    "65000 - 89999",
    "160000 - 209999",
    "210000 - 289999",
    "290000 - 399999",
    "400000 and above"
  ],
  "BR": [
    "90000 - 119999",
    "120000 - 159999",
    "160000 - 219999",
    "220000 - 299999",
    "up to 36000",
    "36000 - 59999",
    "60000 - 89999",
    "300000 - 419999",
    "420000 - 599999",
    "600000 and above"
  ],
  "UA": [
    "300000 - 449999",
    "up to 180000",
    "180000 - 299999",
    "450000 - 649999",
    "1200000 - 1699999",
    "650000 - 899999",
    "900000 - 1199999",
    "1700000 - 2499999",
    "2500000 - 3999999",
    "4000000 and above"
  ],
  "ZA": [
    "300000 - 449999",
    "180000 - 299999",
    "450000 - 649999",
    "2500000 and above",
    "650000 - 899999",
    "up to 90000",
    "90000 - 179999",
    "900000 - 1249999",
    "1250000 - 1799999",
    "1800000 - 2499999"
  ],
  "ID": [
    "90000000 - 119999999",
    "up to 60000000",
    "60000000 - 89999999",
    "120000000 - 159999999",
    "160000000 - 219999999",
    "220000000 - 299999999",
    "300000000 - 399999999",
    "400000000 - 549999999",
    "550000000 - 749999999",
    "750000000 and above"
  ],
  "CO": [
    "400000000 and above",
    "up to 24000000",
    "24000000 -  39999999",
    "40000000 -  59999999",
    "60000000 -  84999999",
    "85000000 -  114999999",
    "115000000 -  149999999",
    "150000000 -  199999999",
    "200000000 -  279999999",
    "280000000 -  399999999"
  ],
  "VN": [
    "up to 120000000",
    "120000000 - 199999999",
    "200000000 - 299999999",
    "300000000 - 449999999",
    "450000000 - 599999999",
    "600000000 - 799999999",
    "800000000 - 1099999999",
    "1100000000 - 1499999999",
    "1500000000 - 1999999999",
    "2000000000 and above"
  ],
  "CZ": [
    "800000 - 1049999",
    "up to 360000",
    "360000 - 549999",
    "550000 - 799999",
    "1050000 - 1349999",
    "1350000 - 1749999",
    "1750000 - 2249999",
    "2250000 - 2999999",
    "3000000 - 4199999",
    "4200000 and above"
  ],
  "BE": [
    "60000 - 79999",
    "up to 24000",
    "24000 - 39999",
    "40000 - 59999",
    "80000 - 104999",
    "105000 - 139999",
    "140000 - 184999",
    "260000 - 379999",
    "380000 and above",
    "185000 - 259999"
  ],
  "PT": [
    "60000 - 79999",
    "300000 and above",
    "80000 - 104999",
    "105000 - 139999",
    "42000 - 59999",
    "up to 16000",
    "16000 - 27999",
    "28000 - 41999",
    "140000 - 194999",
    "195000 - 299999"
  ],
  "KE": [
    "2500000 - 3499999",
    "up to 360000",
    "900000 - 1299999",
    "1800000 - 2499999",
    "360000 - 599999",
    "600000 - 899999",
    "1300000 - 1799999",
    "3500000 - 4999999",
    "5000000 - 7499999",
    "7500000 and above"
  ],
  "SE": [
    "700000 - 899999",
    "900000 - 1149999",
    "1150000 - 1449999",
    "up to 300000",
    "300000 - 499999",
    "500000 - 699999",
    "1450000 - 1849999",
    "1850000 - 2399999",
    "2400000 - 3199999",
    "3200000 and above"
  ],
  "QA": [
    "300000 - 419999",
    "420000 - 599999",
    "up to 72000",
    "72000 - 143999",
    "144000 - 215999",
    "216000 - 299999",
    "600000 - 839999",
    "840000 - 1199999",
    "1200000 - 1799999",
    "1800000 and above"
  ],
  "DZ": [
    "up to 600000",
    "600000 -  899999",
    "900000 -  1199999",
    "1200000 -  1599999",
    "1600000 -  2099999",
    "2100000 -  2799999",
    "2800000 -  3699999",
    "3700000 -  4999999",
    "5000000 -  6999999",
    "7000000 and above"
  ],
  "IR": [
    "up to 250",
    "250 - 399",
    "400 - 599",
    "600 - 849",
    "850  - 119",
    "120 - 159",
    "160 - 209",
    "210 - 299",
    "300 - 449",
    "450 and above"
  ],
  "KW": [
    "up to 9000",
    "9000 -  14999",
    "15000 -  21999",
    "22000 -  29999",
    "30000 -  39999",
    "40000 -  54999",
    "55000 -  74999",
    "75000 -  99999",
    "100000 -  149999",
    "150000 and above"
  ],
  "SA": [
    "up to 84000",
    "84000 - 143999",
    "144000 - 203999",
    "204000 - 287999",
    "288000 - 383999",
    "384000 - 503999",
    "504000 - 659999",
    "660000 - 899999",
    "900000 - 1299999",
    "1300000 and above"
  ],
  "AE": [
    "up to 90000",
    "90000 -  179999",
    "180000 -  269999",
    "270000 -  359999",
    "360000 -  479999",
    "480000 -  649999",
    "650000 -  849999",
    "850000 -  1099999",
    "1100000 -  1499999",
    "1500000 and above"
  ],
  "CR": [
    "7000000 - 9999999",
    "up to 4500000",
    "4500000 - 6999999",
    "10000000 - 13999999",
    "14000000 - 17999999",
    "18000000 - 22999999",
    "23000000 - 29999999",
    "30000000 - 39999999",
    "40000000 - 54999999",
    "55000000 and above"
  ],
  "AR": [
    "up to 9000000",
    "9000000 -  14999999",
    "15000000 -  21999999",
    "22000000 -  29999999",
    "30000000 -  39999999",
    "40000000 -  54999999",
    "55000000 -  74999999",
    "75000000 -  99999999",
    "100000000 -  149999999",
    "150000000 and above"
  ],
  "CL": [
    "75000000 -  99999999",
    "up to 8000000",
    "8000000 -  11999999",
    "12000000 -  17999999",
    "18000000 -  23999999",
    "24000000 -  31999999",
    "32000000 -  41999999",
    "42000000 -  55999999",
    "56000000 -  74999999",
    "100000000 and above"
  ]
};

export const PARENT_PROFILING_SECTIONS = [
  {
    "name": "Your panel choices",
    "icon": "🗂️",
    "help": "How your teen takes part. You can change these later.",
    "qs": [
      {
        "n": "teen-p008",
        "q": "Approve every invitation individually?",
        "o": [
          [
            "Yes",
            "Yes"
          ],
          [
            "No, within approved categories",
            "No, within approved categories"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-p009",
        "q": "Which research methods would you consider?",
        "o": [
          [
            "Surveys",
            "Surveys"
          ],
          [
            "Interviews",
            "Interviews"
          ],
          [
            "Focus groups",
            "Focus groups"
          ],
          [
            "Product testing",
            "Product testing"
          ],
          [
            "Research communities",
            "Research communities"
          ],
          [
            "None",
            "None"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "multi": true,
        "exclusive": [
          "None",
          "Prefer not to answer"
        ],
        "req": true
      },
      {
        "n": "teen-p010",
        "q": "Preferred contact frequency?",
        "o": [
          [
            "Weekly",
            "Weekly"
          ],
          [
            "Fortnightly",
            "Fortnightly"
          ],
          [
            "Monthly",
            "Monthly"
          ],
          [
            "Only when relevant",
            "Only when relevant"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      }
    ],
    "bank": true
  },
  {
    "name": "Where you live",
    "icon": "🗺️",
    "help": null,
    "qs": [
      {
        "n": "teen-g003",
        "q": "Residential area type?",
        "o": [
          [
            "Metropolitan",
            "Metropolitan"
          ],
          [
            "Urban",
            "Urban"
          ],
          [
            "Suburban",
            "Suburban"
          ],
          [
            "Small town",
            "Small town"
          ],
          [
            "Rural",
            "Rural"
          ],
          [
            "Remote",
            "Remote"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-g004",
        "q": "How long have you lived in this country?",
        "o": [
          [
            "Under 1 year",
            "Under 1 year"
          ],
          [
            "1–3 years",
            "1–3 years"
          ],
          [
            "4–5 years",
            "4–5 years"
          ],
          [
            "Over 5 years",
            "Over 5 years"
          ],
          [
            "Since birth",
            "Since birth"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-g005",
        "q": "Preferred survey languages?",
        "kind": "pick",
        "multi": true,
        "req": true,
        "o": BANK_LANGUAGES
      },
      {
        "n": "teen-g006",
        "q": "Primary household language?",
        "kind": "pick",
        "multi": false,
        "req": true,
        "o": BANK_LANGUAGES
      }
    ],
    "bank": true
  },
  {
    "name": "Your home",
    "icon": "🏠",
    "help": null,
    "qs": [
      {
        "n": "teen-h001",
        "q": "Household size?",
        "o": [
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ],
          [
            "4",
            "4"
          ],
          [
            "5",
            "5"
          ],
          [
            "6",
            "6"
          ],
          [
            "7+",
            "7+"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-h002",
        "q": "Number of children under 18?",
        "o": [
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ],
          [
            "4",
            "4"
          ],
          [
            "5+",
            "5+"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-h003",
        "q": "Household age groups?",
        "o": [
          [
            "0–4",
            "0–4"
          ],
          [
            "5–8",
            "5–8"
          ],
          [
            "9–12",
            "9–12"
          ],
          [
            "13–15",
            "13–15"
          ],
          [
            "16–17",
            "16–17"
          ],
          [
            "18+",
            "18+"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "multi": true,
        "exclusive": [
          "Prefer not to answer"
        ],
        "req": true
      },
      {
        "n": "teen-h004",
        "q": "Does the teen have siblings?",
        "o": [
          [
            "Yes",
            "Yes"
          ],
          [
            "No",
            "No"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-h005",
        "q": "Accommodation type?",
        "o": [
          [
            "Owned house",
            "Owned house"
          ],
          [
            "Owned apartment",
            "Owned apartment"
          ],
          [
            "Rented house",
            "Rented house"
          ],
          [
            "Rented apartment",
            "Rented apartment"
          ],
          [
            "Other",
            "Other"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-h006",
        "q": "Household pets?",
        "o": [
          [
            "Dog",
            "Dog"
          ],
          [
            "Cat",
            "Cat"
          ],
          [
            "Fish",
            "Fish"
          ],
          [
            "Bird",
            "Bird"
          ],
          [
            "Small animal",
            "Small animal"
          ],
          [
            "Other",
            "Other"
          ],
          [
            "None",
            "None"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "multi": true,
        "exclusive": [
          "None",
          "Prefer not to answer"
        ],
        "req": true
      },
      {
        "n": "teen-h007",
        "q": "Facilities at home?",
        "o": [
          [
            "Internet",
            "Internet"
          ],
          [
            "Study area",
            "Study area"
          ],
          [
            "Computer",
            "Computer"
          ],
          [
            "TV",
            "TV"
          ],
          [
            "Outdoor space",
            "Outdoor space"
          ],
          [
            "None",
            "None"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "multi": true,
        "exclusive": [
          "None",
          "Prefer not to answer"
        ],
        "req": true
      }
    ],
    "bank": true
  },
  {
    "name": "Work and income",
    "icon": "💼",
    "help": "Used only to match studies, never shown with your name.",
    "qs": [
      {
        "n": "teen-s001",
        "q": "Employment status?",
        "o": [
          [
            "Full-time",
            "Full-time"
          ],
          [
            "Part-time",
            "Part-time"
          ],
          [
            "Self-employed",
            "Self-employed"
          ],
          [
            "Homemaker",
            "Homemaker"
          ],
          [
            "Student",
            "Student"
          ],
          [
            "Retired",
            "Retired"
          ],
          [
            "Unemployed",
            "Unemployed"
          ],
          [
            "Other",
            "Other"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-s002",
        "q": "Highest education?",
        "o": [
          [
            "Primary",
            "Primary"
          ],
          [
            "Secondary",
            "Secondary"
          ],
          [
            "Higher secondary",
            "Higher secondary"
          ],
          [
            "Vocational",
            "Vocational"
          ],
          [
            "Bachelor’s",
            "Bachelor’s"
          ],
          [
            "Master’s",
            "Master’s"
          ],
          [
            "Doctorate",
            "Doctorate"
          ],
          [
            "Other",
            "Other"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "household-income",
        "q": "What is your current household income?",
        "kind": "income",
        "from": "P01",
        "req": false
      },
      {
        "n": "teen-s004",
        "q": "Number of adult income earners?",
        "o": [
          [
            "0",
            "0"
          ],
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3+",
            "3+"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "req": true
      },
      {
        "n": "teen-s005",
        "q": "Household assets?",
        "o": [
          [
            "Car",
            "Car"
          ],
          [
            "Motorcycle",
            "Motorcycle"
          ],
          [
            "Computer",
            "Computer"
          ],
          [
            "Smart TV",
            "Smart TV"
          ],
          [
            "Tablet",
            "Tablet"
          ],
          [
            "Gaming console",
            "Gaming console"
          ],
          [
            "None",
            "None"
          ],
          [
            "Prefer not to answer",
            "Prefer not to answer"
          ]
        ],
        "multi": true,
        "exclusive": [
          "None",
          "Prefer not to answer"
        ],
        "req": true
      }
    ],
    "bank": true
  }
];

export default PARENT_PROFILING_SECTIONS;
