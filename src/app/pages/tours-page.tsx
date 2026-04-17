import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { tours } from "../data/tours";
import { useLang } from "../components/language-context";

export function ToursPage() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<'all' | 'local' | 'international'>('all');

  const filteredTours = filter === 'all' ? tours : tours.filter(t => t.category === filter);

  const getTranslatedName = (tour: typeof tours[0]) => {
    if (lang === 'ru') return tour.nameRu;
    if (lang === 'uz') return tour.nameUz;
    return tour.name;
  };

  const getTranslatedLocation = (tour: typeof tours[0]) => {
    if (lang === 'ru') return tour.locationRu;
    if (lang === 'uz') return tour.locationUz;
    return tour.location;
  };

  const getTranslatedDuration = (tour: typeof tours[0]) => {
    if (lang === 'ru') return tour.durationRu;
    if (lang === 'uz') return tour.durationUz;
    return tour.duration;
  };

  const translations = {
    en: {
      title: "Our Tours",
      subtitle: "EXPLORE THE WORLD",
      all: "All Tours",
      local: "Local Tours",
      international: "International Tours",
      from: "from",
      viewDetails: "View Details",
      reviews: "reviews",
    },
    ru: {
      title: "Наши туры",
      subtitle: "ИССЛЕДУЙТЕ МИР",
      all: "Все туры",
      local: "Местные туры",
      international: "Международные туры",
      from: "от",
      viewDetails: "Подробнее",
      reviews: "отзывов",
    },
    uz: {
      title: "Bizning turlar",
      subtitle: "DUNYONI KASHF ETING",
      all: "Barcha turlar",
      local: "Mahalliy turlar",
      international: "Xorijiy turlar",
      from: "dan",
      viewDetails: "Batafsil",
      reviews: "sharh",
    },
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <Navigation solid />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">
              {t.subtitle}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              {t.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t.all}
            </button>
            <button
              onClick={() => setFilter('local')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                filter === 'local'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t.local}
            </button>
            <button
              onClick={() => setFilter('international')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                filter === 'international'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t.international}
            </button>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={`/tours/${tour.id}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={getTranslatedName(tour)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-[#F97316]">
                        {t.from} ${tour.price}
                      </div>
                      {tour.category === 'local' && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                          {t.local}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                          {getTranslatedName(tour)}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-gray-700">{tour.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{getTranslatedLocation(tour)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#F97316]" />
                          <span>{getTranslatedDuration(tour)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#F97316]" />
                          <span>{tour.maxGroupSize}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {tour.reviews} {t.reviews}
                        </span>
                        <div className="flex items-center gap-2 text-[#F97316] font-semibold group-hover:gap-3 transition-all">
                          {t.viewDetails}
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}