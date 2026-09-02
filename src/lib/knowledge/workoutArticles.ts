import type { Locale } from "@/lib/i18n/locale";
import type { Article } from "@/lib/knowledge/types";

const en: Article[] = [
  {
    title: "Progressive overload, the one rule that matters",
    summary: "Muscles only grow when you consistently ask more of them.",
    body: [
      "Progressive overload means gradually increasing the demand you place on a muscle over time — more weight, more reps, more sets, or better technique on the same load. Without it, your body has no reason to adapt further.",
      "It doesn't need to happen every single session. Adding 1-2.5kg to a lift every week or two, or adding one extra rep before adding weight, is enough to drive long-term progress.",
      "This is also why FitPulse AI scales your suggested volume down by 25% on low-readiness days — progressive overload only works if you can recover from it. Overloading on top of poor recovery leads to stalled progress, not faster gains.",
    ],
  },
  {
    title: "Understanding RPE",
    summary: "A simple 6-10 scale that tells you how hard a set really was.",
    body: [
      "RPE (Rate of Perceived Exertion) is a subjective 1-10 scale for how close to failure a set was. RPE 10 means you couldn't have done another rep; RPE 8 means you had about 2 reps left in the tank; RPE 6 is a comfortably light set.",
      "Logging RPE alongside weight and reps gives you (and the app) a far better picture of your actual effort than weight and reps alone — two sets of 80kg x 8 can feel completely different depending on how fresh you are.",
      "As a rough guide: most hypertrophy work sits in the RPE 7-9 range, leaving a rep or two in reserve most sets, while true 1-rep max attempts sit at RPE 10.",
    ],
  },
  {
    title: "Recovery, HRV, and your readiness score",
    summary: "What's actually driving the number on your dashboard.",
    body: [
      "Heart Rate Variability (HRV) measures the variation in time between heartbeats. Counter-intuitively, higher HRV generally means your nervous system is well-rested; lower HRV is a sign of accumulated fatigue or stress.",
      "FitPulse AI's readiness score weights your sleep score at 40% and your HRV (relative to your personal baseline) at 60%, capturing both how well you slept and how recovered your nervous system is right now.",
      "A single bad night won't tank your training long-term, but consistently training hard through low-readiness days — indicated by a red gauge — is one of the more common paths to a plateau or injury.",
    ],
  },
  {
    title: "Choosing a training split",
    summary: "Push/Pull/Legs, Upper/Lower, or Full Body — what actually matters.",
    body: [
      "A training split just describes how you divide muscle groups across the week — Push/Pull/Legs, Upper/Lower, and Full Body are the most common. No single split is inherently superior; what matters is that you can hit each muscle group with enough frequency and recover between sessions.",
      "For most lifters training 3-5 days a week, hitting each major muscle group twice weekly tends to outperform hitting it once — this is a big part of why Upper/Lower and Push/Pull/Legs (run twice through) are so popular.",
      "Whatever split you pick, consistency over months matters far more than the split itself. The best program is the one you'll actually stick to.",
    ],
  },
  {
    title: "Signs of overtraining — and what to do about it",
    summary: "How to tell the difference between normal soreness and something worse.",
    body: [
      "Occasional muscle soreness and short-term fatigue are normal parts of training. Overtraining is different: persistently elevated resting heart rate, declining HRV, poor sleep, stalled or regressing lifts, and a lingering sense of fatigue that doesn't resolve with a rest day are the warning signs.",
      "If your readiness score has been sitting in the red for several days in a row, that's the app telling you the same thing your body is: it's time for lower volume or a full rest day, not another PR attempt.",
      "Recovery isn't wasted time — it's the part of training where your muscles actually adapt and grow. Respecting a low-readiness day now is what makes the next high-readiness day productive.",
    ],
  },
];

const hi: Article[] = [
  {
    title: "प्रोग्रेसिव ओवरलोड — सबसे ज़रूरी एक नियम",
    summary: "मसल्स तभी बढ़ती हैं जब आप लगातार उनसे थोड़ा ज़्यादा मांगते हैं।",
    body: [
      "प्रोग्रेसिव ओवरलोड का मतलब है समय के साथ किसी मसल पर मांग को धीरे-धीरे बढ़ाना — ज़्यादा वज़न, ज़्यादा रेप्स, ज़्यादा सेट्स, या उसी वज़न पर बेहतर तकनीक। इसके बिना शरीर के पास आगे एडाप्ट होने की कोई वजह नहीं होती।",
      "यह हर सेशन में होना ज़रूरी नहीं है। हर एक-दो हफ्ते में किसी लिफ्ट में 1-2.5kg जोड़ना, या वज़न बढ़ाने से पहले एक अतिरिक्त रेप जोड़ना, लंबे समय की प्रगति के लिए काफी है।",
      "यही वजह है कि FitPulse AI कम रिकवरी वाले दिनों में आपके सुझाए गए वॉल्यूम को 25% कम कर देता है — प्रोग्रेसिव ओवरलोड तभी काम करता है जब आप उससे रिकवर कर सकें। कमज़ोर रिकवरी के ऊपर ओवरलोड करने से प्रगति रुक जाती है, तेज़ नहीं होती।",
    ],
  },
  {
    title: "RPE को समझें",
    summary: "एक सरल 6-10 स्केल जो बताता है कि सेट वास्तव में कितना कठिन था।",
    body: [
      "RPE (Rate of Perceived Exertion) एक व्यक्तिगत 1-10 स्केल है जो बताता है कि सेट फेलियर के कितने करीब था। RPE 10 का मतलब है कि एक भी रेप और नहीं हो पाता; RPE 8 का मतलब है कि लगभग 2 रेप्स बाकी थे; RPE 6 एक आराम से किया गया हल्का सेट है।",
      "वज़न और रेप्स के साथ RPE दर्ज करने से आपको (और ऐप को) आपकी वास्तविक मेहनत की कहीं बेहतर तस्वीर मिलती है — सिर्फ वज़न और रेप्स से नहीं। 80kg के 8 रेप्स के दो सेट, आपकी ताज़गी के आधार पर पूरी तरह अलग महसूस हो सकते हैं।",
      "एक मोटे अनुमान के तौर पर: अधिकतर हाइपरट्रॉफी वर्क RPE 7-9 के बीच होता है, जिसमें ज़्यादातर सेट्स में एक-दो रेप बाकी रहते हैं, जबकि असली 1-रेप मैक्स प्रयास RPE 10 पर होते हैं।",
    ],
  },
  {
    title: "रिकवरी, HRV और आपका रेडीनेस स्कोर",
    summary: "आपके डैशबोर्ड पर दिख रहे नंबर के पीछे क्या है।",
    body: [
      "हार्ट रेट वेरिएबिलिटी (HRV) दिल की धड़कनों के बीच के समय में होने वाले बदलाव को मापता है। सुनने में उल्टा लगे, लेकिन ज़्यादा HRV का मतलब सामान्यतः यह होता है कि आपका नर्वस सिस्टम अच्छी तरह आराम कर चुका है; कम HRV थकान या तनाव के जमा होने का संकेत है।",
      "FitPulse AI का रेडीनेस स्कोर आपके स्लीप स्कोर को 40% वज़न और आपके HRV (आपकी व्यक्तिगत बेसलाइन के सापेक्ष) को 60% वज़न देता है, जो यह दिखाता है कि आप कितनी अच्छी तरह सोए और आपका नर्वस सिस्टम अभी कितना रिकवर हुआ है।",
      "एक खराब रात लंबे समय के लिए आपकी ट्रेनिंग को बर्बाद नहीं करेगी, लेकिन लगातार कम रेडीनेस वाले दिनों में — जिन्हें लाल गेज दिखाता है — भारी ट्रेनिंग करना, प्लेटो या चोट की एक सामान्य वजह है।",
    ],
  },
  {
    title: "ट्रेनिंग स्प्लिट कैसे चुनें",
    summary: "पुश/पुल/लेग्स, अपर/लोअर या फुल बॉडी — वास्तव में क्या मायने रखता है।",
    body: [
      "ट्रेनिंग स्प्लिट सिर्फ यह बताता है कि आप हफ्ते भर में मसल ग्रुप्स को कैसे बांटते हैं — पुश/पुल/लेग्स, अपर/लोअर और फुल बॉडी सबसे सामान्य हैं। कोई एक स्प्लिट खुद से बेहतर नहीं होता; मायने यह रखता है कि आप हर मसल ग्रुप को पर्याप्त बार ट्रेन कर सकें और सेशन्स के बीच रिकवर कर सकें।",
      "हफ्ते में 3-5 दिन ट्रेनिंग करने वाले अधिकतर लोगों के लिए, हर बड़े मसल ग्रुप को हफ्ते में एक बार की जगह दो बार ट्रेन करना बेहतर परिणाम देता है — यही एक बड़ी वजह है कि अपर/लोअर और पुश/पुल/लेग्स (हफ्ते में दो बार) इतने लोकप्रिय हैं।",
      "जो भी स्प्लिट आप चुनें, महीनों तक बनी रहने वाली निरंतरता स्प्लिट से कहीं ज़्यादा मायने रखती है। सबसे अच्छा प्रोग्राम वही है जिसे आप वास्तव में लगातार फॉलो कर पाएं।",
    ],
  },
  {
    title: "ओवरट्रेनिंग के संकेत — और उससे कैसे निपटें",
    summary: "सामान्य दर्द और कुछ ज़्यादा गंभीर के बीच फ़र्क कैसे पहचानें।",
    body: [
      "कभी-कभार मसल में दर्द और थोड़े समय की थकान ट्रेनिंग का सामान्य हिस्सा है। ओवरट्रेनिंग अलग है: लगातार बढ़ा हुआ रेस्टिंग हार्ट रेट, गिरता HRV, खराब नींद, रुकती या घटती लिफ्ट्स, और एक ऐसी थकान जो रेस्ट डे लेने पर भी नहीं जाती — ये चेतावनी के संकेत हैं।",
      "अगर आपका रेडीनेस स्कोर लगातार कई दिनों से लाल दिख रहा है, तो ऐप आपको वही बता रहा है जो आपका शरीर पहले से कह रहा है: अब समय है कम वॉल्यूम या पूरे रेस्ट डे का, किसी नए PR प्रयास का नहीं।",
      "रिकवरी समय की बर्बादी नहीं है — यही वह हिस्सा है जहां आपकी मसल्स वास्तव में एडाप्ट होती हैं और बढ़ती हैं। आज कम रेडीनेस वाले दिन का सम्मान करना ही अगले उच्च रेडीनेस वाले दिन को असरदार बनाता है।",
    ],
  },
];

export const workoutArticles: Record<Locale, Article[]> = { en, hi };
