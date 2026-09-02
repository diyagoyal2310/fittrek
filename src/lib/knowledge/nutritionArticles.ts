import type { Locale } from "@/lib/i18n/locale";
import type { Article } from "@/lib/knowledge/types";

const en: Article[] = [
  {
    title: "Macronutrients 101",
    summary: "What protein, carbs, and fat each actually do for your body.",
    body: [
      "Protein supplies the amino acids your body uses to repair and build muscle tissue after training. It's the macro most directly tied to muscle retention and growth, which is why FitPulse AI sets protein targets first — around 2.0–2.4g per kg of bodyweight depending on your goal.",
      "Carbohydrates are your body's preferred fuel for high-intensity training. They replenish muscle glycogen, support recovery between sessions, and directly affect how strong and energetic your workouts feel — this is why intake is higher on training days under the Recomposition plan.",
      "Fat supports hormone production (including testosterone) and helps absorb fat-soluble vitamins. It shouldn't be minimized too aggressively even during a cut — most plans keep fat intake moderate rather than near-zero.",
    ],
  },
  {
    title: "Calories & TDEE, explained",
    summary: "How your Total Daily Energy Expenditure drives every macro number you see.",
    body: [
      "TDEE (Total Daily Energy Expenditure) is the number of calories your body burns in a day: your Basal Metabolic Rate (BMR — the energy spent just staying alive) plus active calories burned through movement and exercise, plus the Thermic Effect of Food (energy spent digesting what you eat).",
      "FitPulse AI estimates your BMR using the Mifflin-St Jeor equation from your weight, height, age, and sex, then adds your Mi Watch's active calorie reading to get a live TDEE estimate — which is why your macro plan shifts slightly day to day as your activity changes.",
      "A calorie deficit (eating below TDEE) drives fat loss; a surplus (eating above TDEE) supports muscle gain. Recomposition keeps calories near maintenance while training and protein intake do the work of shifting body composition.",
    ],
  },
  {
    title: "Protein timing & intake for muscle growth",
    summary: "Total daily protein matters far more than exact meal timing.",
    body: [
      "Muscle protein synthesis responds to protein intake spread across the day — most research points to 3-5 meals with 0.3-0.5g of protein per kg of bodyweight each as a practical target, rather than one large protein dose.",
      "The old 'anabolic window' idea (that you must eat protein within 30 minutes of training) has been largely walked back — what matters most is hitting your total daily protein target consistently, day after day.",
      "If you're cutting, keeping protein high (toward 2.4g/kg) is one of the most effective ways to preserve muscle mass while in a calorie deficit.",
    ],
  },
  {
    title: "Carb cycling for recomposition",
    summary: "Why your carbs go up on training days and down on rest days.",
    body: [
      "Carb cycling means eating more carbohydrates on days you train hard and fewer on rest days. The logic: your muscles can actually use the extra glucose around training (for fuel and glycogen replenishment), while on rest days you need less of it.",
      "FitPulse AI's Recomposition plan applies this automatically — training-day carbs are set higher than rest-day carbs, while protein stays constant and calories hover near maintenance either way.",
      "This approach helps you build muscle and lose fat at the same time, though it's typically a slower process than committing fully to a cut or a bulk.",
    ],
  },
  {
    title: "Hydration & micronutrients",
    summary: "The less glamorous half of nutrition that still moves the needle.",
    body: [
      "Water intake affects strength, endurance, and even how accurately your Mi Watch reads HRV and resting heart rate — dehydration measurably worsens recovery metrics.",
      "Micronutrients like magnesium, zinc, and vitamin D play supporting roles in hormone production, sleep quality, and muscle recovery. A varied diet with vegetables, fruit, and whole grains generally covers this without needing to overthink it.",
      "None of this replaces hitting your calorie and protein targets — but ignoring it can quietly cap your recovery and performance even when your macros look perfect.",
    ],
  },
];

const hi: Article[] = [
  {
    title: "मैक्रोन्यूट्रिएंट्स 101",
    summary: "प्रोटीन, कार्ब्स और फैट शरीर में वास्तव में क्या काम करते हैं।",
    body: [
      "प्रोटीन वे अमीनो एसिड देता है जिनसे आपका शरीर ट्रेनिंग के बाद मसल टिशू की मरम्मत और निर्माण करता है। यह मसल बनाए रखने और बढ़ाने से सबसे सीधे जुड़ा मैक्रो है, इसलिए FitPulse AI सबसे पहले प्रोटीन का लक्ष्य तय करता है — आपके लक्ष्य के अनुसार शरीर के वज़न के प्रति kg लगभग 2.0–2.4 ग्राम।",
      "कार्बोहाइड्रेट हाई-इंटेंसिटी ट्रेनिंग के लिए आपके शरीर का पसंदीदा ईंधन हैं। ये मसल ग्लाइकोजन को फिर से भरते हैं, सेशन्स के बीच रिकवरी में मदद करते हैं, और यह सीधे तौर पर तय करते हैं कि वर्कआउट के दौरान आपको कितनी ताकत और एनर्जी मिलती है — इसीलिए रीकम्पोज़िशन प्लान में ट्रेनिंग वाले दिनों में इनका सेवन ज़्यादा रखा जाता है।",
      "फैट हार्मोन उत्पादन (टेस्टोस्टेरोन सहित) में मदद करता है और फैट में घुलने वाले विटामिनों को अवशोषित करने में सहायक है। कट के दौरान भी इसे बहुत ज़्यादा कम नहीं करना चाहिए — अधिकतर प्लान फैट को शून्य के करीब लाने के बजाय संतुलित स्तर पर रखते हैं।",
    ],
  },
  {
    title: "कैलोरी और TDEE को समझें",
    summary: "आपका कुल दैनिक ऊर्जा व्यय (TDEE) हर मैक्रो नंबर को कैसे तय करता है।",
    body: [
      "TDEE (Total Daily Energy Expenditure) वह कैलोरी है जो आपका शरीर एक दिन में खर्च करता है: आपका बेसल मेटाबॉलिक रेट (BMR — सिर्फ जीवित रहने के लिए खर्च होने वाली ऊर्जा), प्लस मूवमेंट और एक्सरसाइज़ से जलने वाली एक्टिव कैलोरी, प्लस भोजन पचाने में लगने वाली ऊर्जा (थर्मिक इफेक्ट ऑफ फूड)।",
      "FitPulse AI आपके वज़न, लंबाई, उम्र और लिंग के आधार पर Mifflin-St Jeor फॉर्मूले से आपका BMR निकालता है, फिर उसमें आपकी Mi Watch से मिली एक्टिव कैलोरी जोड़कर लाइव TDEE अनुमान तैयार करता है — इसीलिए आपकी एक्टिविटी बदलने पर आपका मैक्रो प्लान भी थोड़ा बदल जाता है।",
      "कैलोरी डेफिसिट (TDEE से कम खाना) फैट लॉस को बढ़ाता है; सरप्लस (TDEE से ज़्यादा खाना) मसल गेन में मदद करता है। रीकम्पोज़िशन में कैलोरी लगभग मेंटेनेंस के बराबर रखी जाती है, जबकि ट्रेनिंग और प्रोटीन इनटेक बॉडी कॉम्पोज़िशन बदलने का काम करते हैं।",
    ],
  },
  {
    title: "मसल ग्रोथ के लिए प्रोटीन टाइमिंग और इनटेक",
    summary: "सटीक मील टाइमिंग से ज़्यादा ज़रूरी है दिन का कुल प्रोटीन।",
    body: [
      "मसल प्रोटीन सिंथेसिस पूरे दिन में फैले प्रोटीन इनटेक पर बेहतर प्रतिक्रिया देता है — अधिकतर रिसर्च एक बड़े डोज़ के बजाय 3-5 मील्स में हर बार शरीर के वज़न के प्रति kg लगभग 0.3-0.5 ग्राम प्रोटीन को व्यावहारिक लक्ष्य मानती है।",
      "पुरानी 'एनाबॉलिक विंडो' वाली धारणा (कि ट्रेनिंग के 30 मिनट के भीतर प्रोटीन लेना ज़रूरी है) अब काफी हद तक गलत मानी जाती है — सबसे ज़्यादा मायने यह रखता है कि आप रोज़ लगातार अपना कुल प्रोटीन लक्ष्य पूरा करें।",
      "यदि आप कट कर रहे हैं, तो प्रोटीन को ऊँचा रखना (लगभग 2.4 ग्राम/kg) कैलोरी डेफिसिट में मसल मास बचाने के सबसे असरदार तरीकों में से एक है।",
    ],
  },
  {
    title: "रीकम्पोज़िशन के लिए कार्ब साइकलिंग",
    summary: "ट्रेनिंग वाले दिन कार्ब्स ज़्यादा और रेस्ट वाले दिन कम क्यों होते हैं।",
    body: [
      "कार्ब साइकलिंग का मतलब है कि जिस दिन आप ज़्यादा मेहनत से ट्रेनिंग करते हैं उस दिन ज़्यादा कार्बोहाइड्रेट खाना, और रेस्ट वाले दिन कम। तर्क यह है: ट्रेनिंग के आस-पास आपकी मसल्स अतिरिक्त ग्लूकोज़ का असरदार उपयोग कर पाती हैं (ईंधन और ग्लाइकोजन भरने के लिए), जबकि रेस्ट के दिन इसकी ज़रूरत कम होती है।",
      "FitPulse AI का रीकम्पोज़िशन प्लान यह स्वतः लागू करता है — ट्रेनिंग वाले दिन के कार्ब्स रेस्ट वाले दिन से ज़्यादा रखे जाते हैं, जबकि प्रोटीन स्थिर रहता है और कैलोरी दोनों स्थितियों में मेंटेनेंस के करीब रहती है।",
      "यह तरीका एक साथ मसल बनाने और फैट घटाने में मदद करता है, हालांकि यह पूरी तरह कट या बल्क करने की तुलना में सामान्यतः धीमी प्रक्रिया है।",
    ],
  },
  {
    title: "हाइड्रेशन और माइक्रोन्यूट्रिएंट्स",
    summary: "पोषण का कम चर्चित हिस्सा, जो फिर भी बहुत फ़र्क डालता है।",
    body: [
      "पानी का सेवन ताकत, एंड्यूरेंस और यहां तक कि आपकी Mi Watch द्वारा HRV और रेस्टिंग हार्ट रेट को कितनी सटीकता से मापा जाता है, इसे भी प्रभावित करता है — डिहाइड्रेशन रिकवरी मेट्रिक्स को स्पष्ट रूप से खराब कर देता है।",
      "मैग्नीशियम, ज़िंक और विटामिन D जैसे माइक्रोन्यूट्रिएंट्स हार्मोन उत्पादन, स्लीप क्वालिटी और मसल रिकवरी में सहायक भूमिका निभाते हैं। सब्ज़ियों, फलों और होल ग्रेन्स से भरा विविध आहार आमतौर पर इसे बिना ज़्यादा सोचे पूरा कर देता है।",
      "यह सब कैलोरी और प्रोटीन लक्ष्य पूरा करने का विकल्प नहीं है — लेकिन इसे नज़रअंदाज़ करने से आपकी रिकवरी और परफॉर्मेंस चुपचाप सीमित हो सकती है, भले ही आपके मैक्रोज़ बिल्कुल सही दिख रहे हों।",
    ],
  },
];

export const nutritionArticles: Record<Locale, Article[]> = { en, hi };
