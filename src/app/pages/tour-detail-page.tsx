import { useState } from "react";
import { useParams } from "react-router";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  Calendar,
  Phone,
  User,
  ArrowLeft,
  Mountain,
} from "lucide-react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { tours } from "../data/tours";
import { useLang } from "../components/language-context";

export function TourDetailPage() {
  const { tourId } = useParams();
  const { lang } = useLang();
  const tour = tours.find((t) => t.id === tourId);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "1",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tur topilmadi</h1>
          <a href="/tours" className="text-[#F97316] hover:underline">
            Turlar sahifasiga qaytish
          </a>
        </div>
      </div>
    );
  }

  const getTranslatedName = () => {
    if (lang === "ru") return tour.nameRu;
    if (lang === "uz") return tour.nameUz;
    return tour.name;
  };

  const getTranslatedLocation = () => {
    if (lang === "ru") return tour.locationRu;
    if (lang === "uz") return tour.locationUz;
    return tour.location;
  };

  const getTranslatedDuration = () => {
    if (lang === "ru") return tour.durationRu;
    if (lang === "uz") return tour.durationUz;
    return tour.duration;
  };

  const getTranslatedDescription = () => {
    if (lang === "ru") return tour.descriptionRu;
    if (lang === "uz") return tour.descriptionUz;
    return tour.description;
  };

  const getTranslatedHighlights = () => {
    if (lang === "ru") return tour.highlightsRu;
    if (lang === "uz") return tour.highlightsUz;
    return tour.highlights;
  };

  const getTranslatedIncludes = () => {
    if (lang === "ru") return tour.includesRu;
    if (lang === "uz") return tour.includesUz;
    return tour.includes;
  };

  const getTranslatedItinerary = () => {
    return tour.itinerary.map((item) => ({
      day: item.day,
      title: lang === "ru" ? item.titleRu : lang === "uz" ? item.titleUz : item.title,
      description:
        lang === "ru"
          ? item.descriptionRu
          : lang === "uz"
          ? item.descriptionUz
          : item.description,
    }));
  };

  const translations = {
    en: {
      backToTours: "Back to Tours",
      overview: "Overview",
      highlights: "Tour Highlights",
      includes: "What's Included",
      itinerary: "Day by Day Itinerary",
      bookNow: "Book This Tour",
      day: "Day",
      maxGroup: "Max Group Size",
      difficulty: "Difficulty Level",
      easy: "Easy",
      moderate: "Moderate",
      challenging: "Challenging",
      reviews: "reviews",
      name: "Full Name",
      phone: "Phone Number",
      date: "Preferred Date",
      guests: "Number of Guests",
      message: "Additional Message",
      submit: "Submit Booking Request",
      submitting: "Sending...",
      successTitle: "Request Sent!",
      successMessage:
        "Our team will contact you soon via Telegram or phone to confirm your booking.",
      pricePerPerson: "per person",
    },
    ru: {
      backToTours: "Назад к турам",
      overview: "Обзор",
      highlights: "Основные моменты",
      includes: "Что включено",
      itinerary: "Программа по дням",
      bookNow: "Забронировать тур",
      day: "День",
      maxGroup: "Макс. размер группы",
      difficulty: "Сложность",
      easy: "Легкий",
      moderate: "Средний",
      challenging: "Сложный",
      reviews: "отзывов",
      name: "Полное имя",
      phone: "Номер телефона",
      date: "Предпочитаемая дата",
      guests: "Количество гостей",
      message: "Дополнительное сообщение",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      successTitle: "Заявка отправлена!",
      successMessage:
        "Наша команда свяжется с вами в ближайшее время через Telegram или телефон для подтверждения.",
      pricePerPerson: "с человека",
    },
    uz: {
      backToTours: "Turlarga qaytish",
      overview: "Umumiy ma'lumot",
      highlights: "Asosiy jihatlar",
      includes: "Nima kiradi",
      itinerary: "Kun tartibi",
      bookNow: "Turni band qilish",
      day: "Kun",
      maxGroup: "Maks. guruh hajmi",
      difficulty: "Qiyinlik darajasi",
      easy: "Oson",
      moderate: "O'rtacha",
      challenging: "Qiyin",
      reviews: "sharh",
      name: "To'liq ism",
      phone: "Telefon raqam",
      date: "Kerakli sana",
      guests: "Mehmonlar soni",
      message: "Qo'shimcha xabar",
      submit: "So'rov yuborish",
      submitting: "Yuborilmoqda...",
      successTitle: "So'rov yuborildi!",
      successMessage:
        "Jamoamiz tez orada Telegram yoki telefon orqali siz bilan bog'lanadi.",
      pricePerPerson: "kishiga",
    },
  };

  const t = translations[lang];

  const difficultyText = {
    easy: t.easy,
    moderate: t.moderate,
    challenging: t.challenging,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const telegramMessage = `
🎯 Yangi tur band qilish so'rovi!

📌 Tur: ${getTranslatedName()}
💰 Narx: $${tour.price}
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
📅 Sana: ${formData.date}
👥 Mehmonlar: ${formData.guests}
💬 Xabar: ${formData.message || "Yo'q"}
    `.trim();

    try {
      const BOT_TOKEN = '8684844064:AAEreGByfuuTCrwe2umnW3rBt5x6RL4KMKg';
      const CHAT_ID = '-1003927231846';
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        }
      );
      if (!response.ok) throw new Error('Telegram API error');
    } catch (err) {
      console.error('Failed to send to Telegram:', err);
    }

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <Navigation />

      {/* Hero Gallery */}
      <section className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <a
            href="/tours"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F97316] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToTours}
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden">
            <div className="h-96 md:h-full">
              <img
                src={tour.gallery[0]}
                alt={getTranslatedName()}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tour.gallery.slice(1, 3).map((img, i) => (
                <div key={i} className="h-48">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Tour Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-3">
                      {getTranslatedName()}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#F97316]" />
                        <span>{getTranslatedLocation()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-gray-700">{tour.rating}</span>
                        <span className="text-sm">({tour.reviews} {t.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-800">{getTranslatedDuration()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t.maxGroup}</p>
                      <p className="font-semibold text-gray-800">{tour.maxGroupSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Mountain className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t.difficulty}</p>
                      <p className="font-semibold text-gray-800">
                        {difficultyText[tour.difficulty]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">{t.overview}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {getTranslatedDescription()}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t.highlights}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getTranslatedHighlights().map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl">
                      <Check className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t.includes}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getTranslatedIncludes().map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t.itinerary}</h2>
                <div className="space-y-6">
                  {getTranslatedItinerary().map((day) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#F97316] hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white flex items-center justify-center font-bold flex-shrink-0">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-2">{day.title}</h3>
                          <p className="text-gray-600">{day.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
                  <div className="text-center mb-6 pb-6 border-b border-gray-200">
                    <div className="text-4xl font-bold text-[#F97316] mb-2">${tour.price}</div>
                    <div className="text-gray-500">{t.pricePerPerson}</div>
                  </div>

                  {!showSuccess ? (
                    <>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-6">{t.bookNow}</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <User className="w-4 h-4 text-[#F97316]" />
                            {t.name}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                            placeholder={t.name}
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Phone className="w-4 h-4 text-[#F97316]" />
                            {t.phone}
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                            placeholder="+998"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 text-[#F97316]" />
                            {t.date}
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Users className="w-4 h-4 text-[#F97316]" />
                            {t.guests}
                          </label>
                          <select
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                          >
                            {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map(
                              (num) => (
                                <option key={num} value={num}>
                                  {num} {num === 1 ? "guest" : "guests"}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            {t.message}
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent resize-none"
                            placeholder={t.message}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? t.submitting : t.submit}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                        {t.successTitle}
                      </h3>
                      <p className="text-gray-600 mb-6">{t.successMessage}</p>
                      <button
                        onClick={() => setShowSuccess(false)}
                        className="text-[#F97316] font-semibold hover:underline"
                      >
                        {t.backToTours}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}