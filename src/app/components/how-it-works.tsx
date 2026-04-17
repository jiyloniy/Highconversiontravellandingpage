import { motion } from "motion/react";
import { Search, Settings, Plane } from "lucide-react";
import { useLang } from "./language-context";

export function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { icon: Search, titleKey: "how.step1" as const, descKey: "how.step1_desc" as const, step: "01" },
    { icon: Settings, titleKey: "how.step2" as const, descKey: "how.step2_desc" as const, step: "02" },
    { icon: Plane, titleKey: "how.step3" as const, descKey: "how.step3_desc" as const, step: "03" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("how.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2 mb-4">{t("how.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#F97316]/20 via-[#F97316] to-[#F97316]/20" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/25 relative z-10">
                  <Icon className="w-9 h-9 text-white" />
                </motion.div>
                <span className="text-5xl font-bold text-gray-100 absolute top-0 right-4 md:right-auto md:left-4">{s.step}</span>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{t(s.titleKey)}</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">{t(s.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
