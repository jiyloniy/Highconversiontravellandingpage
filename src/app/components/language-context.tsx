import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "ru" | "uz";

const translations = {
  // Navigation
  "nav.destinations": { en: "Destinations", ru: "Направления", uz: "Yo'nalishlar" },
  "nav.experiences": { en: "Experiences", ru: "Впечатления", uz: "Tajribalar" },
  "nav.deals": { en: "Deals", ru: "Акции", uz: "Aksiyalar" },
  "nav.planner": { en: "Plan Trip", ru: "План поездки", uz: "Sayohat rejasi" },
  "nav.community": { en: "Community", ru: "Сообщество", uz: "Jamiyat" },
  "nav.cta": { en: "Start Journey", ru: "Начать путешествие", uz: "Sayohatni boshlash" },

  // Hero
  "hero.badge": { en: "Over 15,000 adventures crafted", ru: "Более 15 000 организованных приключений", uz: "15 000 dan ortiq sarguzasht yaratilgan" },
  "hero.title1": { en: "Travel Beyond", ru: "Путешествуй за", uz: "Tasavvurdan" },
  "hero.title2": { en: "Imagination", ru: "Пределами", uz: "Tashqari sayohat" },
  "hero.subtitle": { en: "We don't just plan trips. We craft emotion-driven experiences that transform the way you see the world.", ru: "Мы не просто планируем поездки. Мы создаём впечатления, которые меняют ваш взгляд на мир.", uz: "Biz shunchaki sayohat rejalashtirmaymiz. Biz dunyoga qarashingizni o'zgartiradigan tajribalar yaratamiz." },
  "hero.cta1": { en: "Start Your Journey", ru: "Начать путешествие", uz: "Sayohatni boshlash" },
  "hero.cta2": { en: "Watch Story", ru: "Смотреть историю", uz: "Hikoyani ko'rish" },
  "hero.dest_label": { en: "Destination", ru: "Направление", uz: "Manzil" },
  "hero.dest_placeholder": { en: "Where to?", ru: "Куда?", uz: "Qayerga?" },
  "hero.date_label": { en: "Date", ru: "Дата", uz: "Sana" },
  "hero.date_placeholder": { en: "Pick dates", ru: "Выбрать даты", uz: "Sanani tanlang" },
  "hero.budget_label": { en: "Budget", ru: "Бюджет", uz: "Byudjet" },
  "hero.budget_placeholder": { en: "Set budget", ru: "Установить бюджет", uz: "Byudjetni belgilang" },
  "hero.search": { en: "Search", ru: "Поиск", uz: "Qidirish" },
  "hero.float_bali": { en: "Bali, Indonesia", ru: "Бали, Индонезия", uz: "Bali, Indoneziya" },
  "hero.float_starting": { en: "Starting $1,299", ru: "От $1 299", uz: "$1 299 dan" },
  "hero.float_turkey": { en: "Turkey, Istanbul", ru: "Турция, Стамбул", uz: "Turkiya, Istanbul" },
  "hero.float_turkey_price": { en: "Starting $750", ru: "От $750", uz: "$750 dan" },
  "hero.float_rating": { en: "4.9/5 Rating", ru: "Рейтинг 4.9/5", uz: "4.9/5 Reyting" },
  "hero.float_travelers": { en: "15K+ Happy Travelers", ru: "15K+ довольных туристов", uz: "15K+ mamnun sayohatchilar" },

  // Explore by Mood
  "mood.subtitle": { en: "What's your vibe?", ru: "Какое у вас настроение?", uz: "Kayfiyatingiz qanday?" },
  "mood.title": { en: "Explore by Mood", ru: "Исследуй по настроению", uz: "Kayfiyat bo'yicha kashf eting" },
  "mood.desc": { en: "Don't know where to go? Start with how you want to feel.", ru: "Не знаете куда ехать? Начните с того, что хотите почувствовать.", uz: "Qayerga borishni bilmayapsizmi? Nima his qilishni xohlayotganingizdan boshlang." },
  "mood.adventure": { en: "Adventure", ru: "Приключение", uz: "Sarguzasht" },
  "mood.adventure_desc": { en: "Push your limits with thrilling expeditions", ru: "Раздвигайте границы с захватывающими экспедициями", uz: "Hayajonli ekspeditsiyalar bilan chegaralaringizni kengaytiring" },
  "mood.relax": { en: "Relax", ru: "Отдых", uz: "Dam olish" },
  "mood.relax_desc": { en: "Unwind in paradise with serene escapes", ru: "Расслабьтесь в раю с умиротворяющим отдыхом", uz: "Tinch joyda dam oling" },
  "mood.luxury": { en: "Luxury", ru: "Люкс", uz: "Hashamat" },
  "mood.luxury_desc": { en: "Indulge in world-class luxury experiences", ru: "Наслаждайтесь роскошью мирового класса", uz: "Dunyo darajasidagi hashamatdan bahramand bo'ling" },
  "mood.cultural": { en: "Cultural", ru: "Культура", uz: "Madaniyat" },
  "mood.cultural_desc": { en: "Immerse yourself in ancient traditions", ru: "Погрузитесь в древние традиции", uz: "Qadimiy an'analarga sho'ng'ing" },

  // Trending Destinations
  "trending.subtitle": { en: "Popular picks", ru: "Популярные", uz: "Mashhur tanlovlar" },
  "trending.title": { en: "Trending Destinations", ru: "Популярные направления", uz: "Trendga aylangan manzillar" },
  "trending.viewall": { en: "View All", ru: "Все направления", uz: "Barchasini ko'rish" },
  "trending.starting": { en: "Starting from", ru: "От", uz: "Dan boshlab" },
  "trending.badge": { en: "Trending", ru: "Тренд", uz: "Trend" },
  "trending.georgia": { en: "Georgia, Tbilisi", ru: "Грузия, Тбилиси", uz: "Gruziya, Tbilisi" },
  "trending.thailand": { en: "Thailand, Bangkok", ru: "Таиланд, Бангкок", uz: "Tailand, Bangkok" },
  "trending.vietnam": { en: "Vietnam, Ha Long", ru: "Вьетнам, Халонг", uz: "Vetnam, Xalong" },
  "trending.dubai": { en: "Dubai, UAE", ru: "Дубай, ОАЭ", uz: "Dubai, BAA" },
  "trending.bali": { en: "Bali, Indonesia", ru: "Бали, Индонезия", uz: "Bali, Indoneziya" },
  "trending.egypt": { en: "Egypt, Cairo", ru: "Египет, Каир", uz: "Misr, Qohira" },
  "trending.turkey": { en: "Turkey, Istanbul", ru: "Турция, Стамбул", uz: "Turkiya, Istanbul" },
  "trending.azerbaijan": { en: "Azerbaijan, Baku", ru: "Азербайджан, Баку", uz: "Ozarbayjon, Boku" },

  // AI Trip Planner
  "ai.badge": { en: "AI-Powered", ru: "На базе ИИ", uz: "Sun'iy intellekt" },
  "ai.title": { en: "AI Trip Planner", ru: "ИИ Планировщик поездок", uz: "SI Sayohat rejalashtiruvchi" },
  "ai.desc": { en: "Tell us your dream destination and let our AI craft the perfect itinerary for you.", ru: "Расскажите о своём идеальном направлении, и наш ИИ создаст для вас маршрут.", uz: "Orzu qilgan manzilingizni ayting, SI siz uchun mukammal marshrutni yaratsin." },
  "ai.greeting": { en: "Hey! Tell me where you want to go, and I'll generate a personalized trip plan just for you.", ru: "Привет! Расскажите, куда хотите поехать, и я создам персонализированный план поездки.", uz: "Salom! Qayerga borishni xohlayotganingizni ayting, men siz uchun shaxsiy sayohat rejasini yarataman." },
  "ai.placeholder": { en: "e.g. I want to explore Bali for a week...", ru: "напр. Хочу исследовать Бали неделю...", uz: "masalan, Balini bir hafta o'rganmoqchiman..." },
  "ai.generate": { en: "Generate", ru: "Создать", uz: "Yaratish" },
  "ai.book": { en: "Book This Trip", ru: "Забронировать", uz: "Bu sayohatni band qilish" },
  "ai.estimated": { en: "Estimated from", ru: "Ориентировочно от", uz: "Taxminiy narx" },
  "ai.response": { en: "Great choice! Based on your preferences, I recommend a 7-day trip to Bali, Indonesia. Here's your personalized itinerary:", ru: "Отличный выбор! На основе ваших предпочтений реомную 7-дневную поездку на Бали. Вот ваш маршрут:", uz: "Ajoyib tanlov! Sizning xohishlaringizga asoslanib, Baliga 7 kunlik sayohat tavsiya qilaman. Mana sizning marshrutingiz:" },
  "ai.day1": { en: "Arrive in Ubud — explore rice terraces & temples", ru: "Прибытие в Убуд — рисовые террасы и храмы", uz: "Ubudga kelish — guruch terrasalari va ibodatxonalar" },
  "ai.day2": { en: "Tegallalang & waterfall hopping adventure", ru: "Тегаллаланг и приключение по водопадам", uz: "Tegallalang va sharshara sarguzashti" },
  "ai.day3": { en: "Beach vibes in Seminyak — surf & sunset", ru: "Пляжный отдых в Семиньяке — сёрфинг и закат", uz: "Seminyakda plyaj — serfing va quyosh botishi" },
  "ai.day4": { en: "Spa day & departure — total relaxation", ru: "Спа-день и отлёт — полное расслабление", uz: "Spa kuni va jo'nab ketish — to'liq dam olish" },
  "ai.error": { en: "Sorry, something went wrong. Please try again or contact us on Telegram.", ru: "Извините, произошла ошибка. Попробуйте снова или свяжитесь с нами в Telegram.", uz: "Kechirasiz, xatolik yuz berdi. Qaytadan urinib ko'ring yoki Telegramda murojaat qiling." },
  "ai.telegram_hint": { en: "For booking & prices contact us: t.me/mandarintour_namangaan", ru: "Для бронирования и цен: t.me/mandarintour_namangaan", uz: "Bron va narxlar uchun: t.me/mandarintour_namangaan" },

  // Social Proof
  "social.trust": { en: "Trusted by leading travel brands", ru: "Нам доверяют ведущие бренды", uz: "Yetakchi brendlar ishonadi" },
  "social.subtitle": { en: "Testimonials", ru: "Отзывы", uz: "Fikrlar" },
  "social.title": { en: "Travelers' Reviews", ru: "Отзывы путешественников", uz: "Sayohatchilar fikri" },
  "social.stat1_label": { en: "Happy Travelers", ru: "Довольных туристов", uz: "Mamnun sayohatchilar" },
  "social.stat2_label": { en: "Destinations", ru: "Направлений", uz: "Yo'nalishlar" },
  "social.stat3_label": { en: "5-Star Reviews", ru: "5-звёздочных отзывов", uz: "5-yulduzli sharhlar" },
  "social.stat4_label": { en: "Years Experience", ru: "Лет опыта", uz: "Yillik tajriba" },

  // Limited Deals
  "deals.badge": { en: "Limited Time Only", ru: "Только ограниченное время", uz: "Faqat cheklangan vaqt" },
  "deals.title": { en: "Flash Deals", ru: "Горящие предложения", uz: "Tezkor takliflar" },
  "deals.desc": { en: "These incredible deals won't last. Book before time runs out!", ru: "Эти невероятные предложения скоро закончатся. Бронируйте!", uz: "Bu ajoyib takliflar uzoq davom etmaydi. Vaqt tugashidan oldin band qiling!" },
  "deals.days": { en: "Days", ru: "Дней", uz: "Kun" },
  "deals.hours": { en: "Hours", ru: "Часов", uz: "Soat" },
  "deals.mins": { en: "Mins", ru: "Мин", uz: "Daq" },
  "deals.secs": { en: "Secs", ru: "Сек", uz: "Son" },
  "deals.spots": { en: "Only {n} spots left", ru: "Осталось {n} мест", uz: "Faqat {n} ta joy qoldi" },
  "deals.person": { en: "/ person", ru: "/ чел.", uz: "/ kishi" },
  "deals.grab": { en: "Grab This Deal", ru: "Забронировать", uz: "Bu taklifni oling" },

  "deals.thailand": { en: "Trip to Thailand", ru: "Путешествие в Таиланд", uz: "Tailandga sayohat" },
  "deals.turkey": { en: "Trip to Turkey", ru: "Путешествие в Турцию", uz: "Turkiyaga sayohat" },
  "deals.georgia": { en: "Trip to Georgia", ru: "Путешествие в Грузию", uz: "Gruziyaga sayohat" },

  // Experience Gallery
  "gallery.subtitle": { en: "Gallery", ru: "Галерея", uz: "Galereya" },
  "gallery.title": { en: "Experience the World", ru: "Познайте мир", uz: "Dunyoni his eting" },
  "gallery.desc": { en: "Real moments from real travelers. Every photo tells a story.", ru: "Реальные моменты от реальных путешественников.", uz: "Haqiqiy sayohatchilardan haqiqiy lahzalar. Har bir surat hikoya qiladi." },

  // Why Choose Us
  "why.subtitle": { en: "Why us", ru: "Почему мы", uz: "Nega biz" },
  "why.title": { en: "Why Choose Mandarin Tour", ru: "Почему Mandarin Tour", uz: "Nega Mandarin Tour" },
  "why.desc": { en: "We go beyond ordinary travel to create extraordinary memories", ru: "Мы выходим за рамки обычного путешествия", uz: "Biz oddiy sayohatdan tashqariga chiqamiz" },
  "why.support": { en: "24/7 Support", ru: "Поддержка 24/7", uz: "24/7 Qo'llab-quvvatlash" },
  "why.support_desc": { en: "Our dedicated team assists you anytime, anywhere around the globe.", ru: "Наша команда поможет вам в любое время и в любом месте.", uz: "Bizning jamoamiz sizga istalgan vaqtda, istalgan joyda yordam beradi." },
  "why.price": { en: "Best Price Guarantee", ru: "Гарантия лучшей цены", uz: "Eng yaxshi narx kafolati" },
  "why.price_desc": { en: "We ensure the best value with our price-match promise on every booking.", ru: "Мы гарантируем лучшую цену при каждом бронировании.", uz: "Har bir bronlashda eng yaxshi narxni kafolatlaymiz." },
  "why.custom": { en: "Custom Trips", ru: "Индивидуальные туры", uz: "Maxsus sayohatlar" },
  "why.custom_desc": { en: "Fully tailored itineraries designed to match your unique style and interests.", ru: "Полностью индивидуальные маршруты под ваш стиль.", uz: "Sizning uslubingizga mos ravishda tayyorlangan marshrutlar." },
  "why.visa": { en: "Visa Assistance", ru: "Помощь с визой", uz: "Viza yordami" },
  "why.visa_desc": { en: "Hassle-free visa support so you can focus on the adventure ahead.", ru: "Простое оформление визы, чтобы вы сосредоточились на путешествии.", uz: "Siz sarguzashtga e'tibor bering, vizani biz hal qilamiz." },

  // How It Works
  "how.subtitle": { en: "Simple process", ru: "Простой процесс", uz: "Oddiy jarayon" },
  "how.title": { en: "How It Works", ru: "Как это работает", uz: "Qanday ishlaydi" },
  "how.step1": { en: "Choose", ru: "Выберите", uz: "Tanlang" },
  "how.step1_desc": { en: "Browse destinations and pick the experience that calls to you.", ru: "Просматривайте направления и выберите то, что вам подходит.", uz: "Yo'nalishlarni ko'ring va sizga yoqqanini tanlang." },
  "how.step2": { en: "Customize", ru: "Настройте", uz: "Sozlang" },
  "how.step2_desc": { en: "Personalize every detail — from hotels to hidden gems.", ru: "Настройте каждую деталь — от отелей до скрытых жемчужин.", uz: "Har bir tafsilotni sozlang — mehmonxonalardan yashirin joylargacha." },
  "how.step3": { en: "Travel", ru: "Путешествуйте", uz: "Sayohat qiling" },
  "how.step3_desc": { en: "Sit back, relax, and let us handle the rest. Adventure awaits!", ru: "Расслабьтесь, а мы позаботимся обо всём. Приключение ждёт!", uz: "Dam oling, qolganini biz hal qilamiz. Sarguzasht kutmoqda!" },

  // Community
  "community.subtitle": { en: "Community", ru: "Сообщество", uz: "Jamiyat" },
  "community.title": { en: "Travelers Using Mandarin Tour", ru: "Путешественники Mandarin Tour", uz: "Mandarin Tour sayohatchilar" },
  "community.desc": { en: "Join our community of explorers sharing their incredible journeys", ru: "Присоединяйтесь к сообществу исследователей", uz: "Ajoyib sayohatlarini baham ko'rayotgan kashfiyotchilarga qo'shiling" },

  // CTA
  "cta.title1": { en: "Your Next Adventure", ru: "Ваше следующее", uz: "Keyingi sarguzashtingiz" },
  "cta.title2": { en: "Starts Here", ru: "Приключение здесь", uz: "Bu yerdan boshlanadi" },
  "cta.desc": { en: "Stop scrolling, start exploring. Let us craft a journey that exceeds your wildest expectations.", ru: "Перестаньте листать, начните исследовать. Мы создадим путешествие вашей мечты.", uz: "Sahifalarni varaqlamang, kashf etishni boshlang. Biz eng ajoyib sayohatni yaratamiz." },
  "cta.plan": { en: "Plan My Trip", ru: "Спланировать поездку", uz: "Sayohatimni rejalashtirish" },
  "cta.expert": { en: "Talk to an Expert", ru: "Поговорить с экспертом", uz: "Mutaxassis bilan gaplashish" },

  // Footer
  "footer.newsletter_title": { en: "Subscribe to Our Newsletter", ru: "Подпишитесь на рассылку", uz: "Yangiliklarga obuna bo'ling" },
  "footer.newsletter_desc": { en: "Subscribe for exclusive deals, travel tips, and insider guides.", ru: "Подписывайтесь на эксклюзивные предложения и советы.", uz: "Eksklyuziv takliflar va sayohat maslahatlari uchun obuna bo'ling." },
  "footer.email_placeholder": { en: "Your email address", ru: "Ваш email", uz: "Email manzilingiz" },
  "footer.join": { en: "Join", ru: "Подписаться", uz: "Qo'shilish" },
  "footer.brand_desc": { en: "Crafting extraordinary journeys for discerning travelers. Your adventure begins with us.", ru: "Создаём незабываемые путешествия. Ваше приключение начинается с нами.", uz: "Ajoyib sayohatlar yaratamiz. Sarguzashtingiz biz bilan boshlanadi." },
  "footer.company": { en: "Company", ru: "Компания", uz: "Kompaniya" },
  "footer.support": { en: "Support", ru: "Поддержка", uz: "Qo'llab-quvvatlash" },
  "footer.destinations": { en: "Destinations", ru: "Направления", uz: "Yo'nalishlar" },
  "footer.legal": { en: "Legal", ru: "Правовая информация", uz: "Huquqiy" },
  "footer.copyright": { en: "2026 Mandarin Tour. All rights reserved.", ru: "2026 Mandarin Tour. Все права защищены.", uz: "2026 Mandarin Tour. Barcha huquqlar himoyalangan." },

  // Gallery stories
  "gallery.story1": { en: "Sunrise balloon ride over Cappadocia", ru: "Полёт на шаре над Каппадокией на рассвете", uz: "Kappadokiya ustida sharda uchish" },
  "gallery.story2": { en: "Discovering coral reefs beneath the waves", ru: "Открытие коралловых рифов под водой", uz: "To'lqinlar ostidagi marjon riflarini kashf etish" },
  "gallery.story3": { en: "Chasing the Northern Lights in Iceland", ru: "Охота за северным сиянием в Исландии", uz: "Islandiyada shimoliy yorug'lik izidan" },
  "gallery.story4": { en: "Walking through history at Machu Picchu", ru: "Прогулка по истории в Мачу-Пикчу", uz: "Machu-Pikchuda tarix bo'ylab sayr" },
  "gallery.story5": { en: "Savoring flavors in an Asian night market", ru: "Вкусы азиатского ночного рынка", uz: "Osiyo tungi bozorida ta'mlar" },
  "gallery.story6": { en: "Conquering peaks with breathtaking views", ru: "Покорение вершин с потрясающими видами", uz: "Hayratlanarli manzaralar bilan cho'qqilarni zabt etish" },

  // Testimonials
  "testimonial.1": { en: "An absolutely transformative experience. The team curated the perfect itinerary that matched my work-travel lifestyle perfectly.", ru: "Абсолютно трансформирующий опыт. Команда составила идеальный маршрут для моего стиля жизни.", uz: "Butunlay o'zgartiradigan tajriba. Jamoa mening ish-sayohat hayot tarzimga mos mukammal marshrutni tuzdi." },
  "testimonial.2": { en: "From hidden gems to luxurious stays, every detail was flawless. The best investment in travel I've ever made. Absolutely life-changing!", ru: "От скрытых жемчужин до роскошного отдыха — каждая деталь безупречна. Лучшая инвестиция в путешествие!", uz: "Yashirin joylardan hashamatli dam olishgacha — har bir tafsilot mukammal. Eng yaxshi sayohat sarmoyam!" },
  "testimonial.3": { en: "Premium service with exceptional attention to detail. They turned my simple vacation into an unforgettable, story-worthy journey.", ru: "Премиальный сервис с исключительным вниманием к деталям. Мой отпуск превратился в незабываемое путешествие.", uz: "Tafsilotlarga alohida e'tibor bilan premium xizmat. Oddiy ta'tilni unutilmas sayohatga aylantirdi." },
} as const;

type TranslationKey = keyof typeof translations;

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextType | null>(null);

const defaultT = (key: TranslationKey, params?: Record<string, string | number>): string => {
  let text = translations[key]?.["uz"] || translations[key]?.["en"] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
};

const defaultContext: LangContextType = {
  lang: "uz",
  setLang: () => {},
  t: defaultT,
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[key]?.[lang] || translations[key]?.["en"] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  return ctx || defaultContext;
}