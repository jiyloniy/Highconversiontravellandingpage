import { motion } from "motion/react";
import { Shield, Clock, Heart, FileCheck } from "lucide-react";
import { useLang } from "./language-context";

export function WhyChooseUs() {
  const { t } = useLang();

  const features = [
    { icon: Clock, titleKey: "why.support" as const, descKey: "why.support_desc" as const },
    { icon: Shield, titleKey: "why.price" as const, descKey: "why.price_desc" as const },
    { icon: Heart, titleKey: "why.custom" as const, descKey: "why.custom_desc" as const },
    { icon: FileCheck, titleKey: "why.visa" as const, descKey: "why.visa_desc" as const },
  ];

  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("why.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2 mb-4">{t("why.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("why.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all text-center group border border-gray-100">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-[#F97316]" />
                </motion.div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#F97316] transition-colors">{t(f.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
