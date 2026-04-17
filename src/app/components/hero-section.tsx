import { motion } from "motion/react";
import { Search, MapPin, Calendar, DollarSign, ArrowRight, Landmark, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang } from "./language-context";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1588058885747-5dccdd6d4319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBhZXJpYWwlMjB0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0JTIwb3JhbmdlfGVufDF8fHx8MTc3NjQwNTI3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cinematic tropical beach sunset"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 via-[#F97316]/30 to-[#0F172A]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />
      </div>

      {/* Floating glass cards */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-32 right-[10%] hidden lg:block bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#F472B6] rounded-xl flex items-center justify-center">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/90 text-sm font-semibold">{t("hero.float_turkey")}</p>
            <p className="text-white/60 text-xs">{t("hero.float_turkey_price")}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-[8%] hidden lg:block bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/90 text-sm font-semibold">{t("hero.float_rating")}</p>
            <p className="text-white/60 text-xs">{t("hero.float_travelers")}</p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8"
          >
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">{t("hero.badge")}</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            {t("hero.title1")}
            <br />
            <span className="bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F472B6] bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.a
              href="https://t.me/mandarintour_namangaan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-2xl font-semibold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all inline-flex items-center gap-2 group justify-center"
            >
              {t("hero.cta1")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold text-lg border border-white/25 hover:bg-white/20 transition-all"
            >
              {t("hero.cta2")}
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 p-3 max-w-4xl mx-auto border border-white/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                <MapPin className="text-[#F97316] w-5 h-5 shrink-0" />
                <div className="flex-1 text-left">
                  <label className="text-xs text-gray-400 block">{t("hero.dest_label")}</label>
                  <input type="text" placeholder={t("hero.dest_placeholder")} className="w-full border-none outline-none text-[#0F172A] bg-transparent" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors md:border-l border-gray-100">
                <Calendar className="text-[#F97316] w-5 h-5 shrink-0" />
                <div className="flex-1 text-left">
                  <label className="text-xs text-gray-400 block">{t("hero.date_label")}</label>
                  <input type="text" placeholder={t("hero.date_placeholder")} className="w-full border-none outline-none text-[#0F172A] bg-transparent" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors md:border-l border-gray-100">
                <DollarSign className="text-[#F97316] w-5 h-5 shrink-0" />
                <div className="flex-1 text-left">
                  <label className="text-xs text-gray-400 block">{t("hero.budget_label")}</label>
                  <input type="text" placeholder={t("hero.budget_placeholder")} className="w-full border-none outline-none text-[#0F172A] bg-transparent" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5" />
                {t("hero.search")}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}