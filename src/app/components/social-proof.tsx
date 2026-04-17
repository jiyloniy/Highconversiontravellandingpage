import { motion } from "motion/react";
import { Star, Quote, ExternalLink } from "lucide-react";
import { useLang } from "./language-context";

const partners = [
  { name: "Selfie Travel", url: "https://selfietravel.uz", color: "#E91E63" },
  { name: "Asia Luxe", url: "https://asialuxe.uz", color: "#FFD700" },
  { name: "Uzbekistan Airways", url: "https://uzairways.com", color: "#4CAF50" },
  { name: "Fun & Sun", url: "https://fununsun.com", color: "#00BCD4" },
  { name: "Kazunion", url: "https://kazunion.com", color: "#9C27B0" },
];

export function SocialProof() {
  const { t } = useLang();

  const testimonials = [
    { id: 1, name: "Dilnoza Karimova", role: "Bloger", image: "https://images.unsplash.com/photo-1564564360647-684f24ae3e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMHlvdW5nJTIwd29tYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc2NDI3MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", textKey: "testimonial.1" as const, rating: 5 },
    { id: 2, name: "Jasur Toshmatov", role: "Tadbirkor", image: "https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMGJ1c2luZXNzbWFuJTIwbWFuJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc2NDI3MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", textKey: "testimonial.2" as const, rating: 5 },
    { id: 3, name: "Madina Rahimova", role: "Shifokor", image: "https://images.unsplash.com/photo-1670191247079-f9713ae06dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMHdvbWFuJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2NDI3MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", textKey: "testimonial.3" as const, rating: 5 },
  ];

  const stats = [
    { label: t("social.stat1_label"), value: "15K+" },
    { label: t("social.stat2_label"), value: "120+" },
    { label: t("social.stat3_label"), value: "4.9/5" },
    { label: t("social.stat4_label"), value: "12+" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-8 text-center">{t("social.trust")}</p>
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl px-8 py-10 shadow-xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {partners.map((p, i) => (
                <motion.a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="group relative flex flex-col items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F97316]/40 transition-all duration-300 cursor-pointer min-w-[140px]"
                >
                  <span className="text-lg font-bold text-white/80 group-hover:text-[#F97316] transition-colors tracking-wide">
                    {p.name}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-white/30 group-hover:text-[#F97316]/60 transition-colors">
                    <ExternalLink className="w-2.5 h-2.5" />
                    {p.url.replace("https://", "")}
                  </span>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 0 20px ${p.color}20, inset 0 0 20px ${p.color}08` }} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("social.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2 mb-4">{t("social.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((te, i) => (
            <motion.div key={te.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-orange-500/5 transition-all border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-100" />
              <div className="flex gap-1 mb-5">
                {[...Array(te.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"{t(te.textKey)}"</p>
              <div className="flex items-center gap-4">
                <img src={te.image} alt={te.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-[#0F172A]">{te.name}</p>
                  <p className="text-sm text-gray-400">{te.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-[#F97316] to-[#EA580C] bg-clip-text text-transparent mb-1">{s.value}</p>
              <p className="text-gray-500">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}