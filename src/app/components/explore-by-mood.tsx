import { motion } from "motion/react";
import { Mountain, Waves, Gem, Landmark } from "lucide-react";
import { useLang } from "./language-context";

export function ExploreByMood() {
  const { t } = useLang();

  const moods = [
    {
      id: 1,
      titleKey: "mood.adventure" as const,
      descKey: "mood.adventure_desc" as const,
      icon: Mountain,
      image: "https://images.unsplash.com/photo-1761811401090-afad279591d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5vJTIwYWR2ZW50dXJlJTIwaGlraW5nJTIwZHJhbWF0aWN8ZW58MXx8fHwxNzc2NDA1Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      titleKey: "mood.relax" as const,
      descKey: "mood.relax_desc" as const,
      icon: Waves,
      image: "https://images.unsplash.com/photo-1767884161044-e75de514a2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBzcGElMjByZWxheGF0aW9uJTIwb2NlYW4lMjBjYWxtfGVufDF8fHx8MTc3NjQwNTI3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      titleKey: "mood.luxury" as const,
      descKey: "mood.luxury_desc" as const,
      icon: Gem,
      image: "https://images.unsplash.com/photo-1715242563833-946f4b811399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBpbmZpbml0eSUyMHBvb2wlMjB0cm9waWNhbHxlbnwxfHx8fDE3NzY0MDUyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      id: 4,
      titleKey: "mood.cultural" as const,
      descKey: "mood.cultural_desc" as const,
      icon: Landmark,
      image: "https://images.unsplash.com/photo-1772183095332-231505d65e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlbXBsZSUyMGN1bHR1cmFsJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzc2NDA1MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#F97316] font-semibold uppercase tracking-wider text-sm mb-3">
            {t("mood.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t("mood.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("mood.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {moods.map((mood, i) => {
            const Icon = mood.icon;
            return (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                onClick={() => window.location.href = '/tours'}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img src={mood.image} alt={t(mood.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient} opacity-50 group-hover:opacity-60 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{t(mood.titleKey)}</h3>
                  <p className="text-white/80 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t(mood.descKey)}
                  </p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 rounded-3xl transition-all duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}