import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLang } from "./language-context";

export function CtaBanner() {
  const { t } = useLang();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#F472B6]" />
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t("cta.title1")}<br />{t("cta.title2")}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 bg-white text-[#F97316] rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all inline-flex items-center gap-2 group"
              onClick={() => window.open("https://t.me/mandarintour_namangaan", "_blank")}
            >
              {t("cta.plan")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 bg-white/15 backdrop-blur-md text-white rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/25 transition-all"
              onClick={() => window.open("tel:+998953004444")}
            >
              {t("cta.expert")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}