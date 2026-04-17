import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Flame, ArrowRight, Users } from "lucide-react";
import { useLang } from "./language-context";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const deals = [
  { id: 1, titleKey: "deals.thailand" as const, image: "https://images.unsplash.com/photo-1645108254499-5f9aa36b7665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZCUyMHRyb3BpY2FsJTIwYmVhY2glMjB0ZW1wbGV8ZW58MXx8fHwxNzc2NDE2ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", originalPrice: "$1,200", price: "$799", discount: "33% OFF", spotsLeft: 4, duration: "7 Days" },
  { id: 2, titleKey: "deals.turkey" as const, image: "https://images.unsplash.com/photo-1669117403979-be8e9448d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUdXJrZXklMjBJc3RhbmJ1bCUyMG1vc3F1ZSUyMEJvc3Bob3J1c3xlbnwxfHx8fDE3NzY0MTY4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", originalPrice: "$1,200", price: "$750", discount: "38% OFF", spotsLeft: 3, duration: "8 Days" },
  { id: 3, titleKey: "deals.georgia" as const, image: "https://images.unsplash.com/photo-1766923475119-6ba1dc2342ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYmlsaXNpJTIwR2VvcmdpYSUyMGNpdHlzY2FwZSUyMHNjZW5pY3xlbnwxfHx8fDE3NzY0MTY4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", originalPrice: "$900", price: "$549", discount: "39% OFF", spotsLeft: 6, duration: "5 Days" },
];

const targetDate = new Date(Date.now() + 3 * 86400000 + 7 * 3600000);

export function LimitedDeals() {
  const countdown = useCountdown(targetDate);
  const { t } = useLang();

  return (
    <section id="deals" className="py-24 bg-gradient-to-b from-[#FFF7ED] to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#F97316]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-4 py-2 rounded-full mb-4 shadow-lg shadow-orange-500/25">
            <Flame className="w-4 h-4" />
            <span className="font-semibold text-sm">{t("deals.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t("deals.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("deals.desc")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center gap-4 mb-14">
          {[
            { label: t("deals.days"), value: countdown.days },
            { label: t("deals.hours"), value: countdown.hours },
            { label: t("deals.mins"), value: countdown.minutes },
            { label: t("deals.secs"), value: countdown.seconds },
          ].map((item) => (
            <div key={item.label} className="bg-[#0F172A] text-white rounded-2xl px-4 py-3 min-w-[70px] text-center shadow-lg">
              <p className="text-2xl md:text-3xl font-bold tabular-nums">{String(item.value).padStart(2, "0")}</p>
              <p className="text-xs text-white/60 mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all border border-gray-100">
              <div className="relative h-56 overflow-hidden">
                <img src={deal.image} alt={deal.titleKey} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">{deal.discount}</div>
                <div className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border border-white/20">
                  <Users className="w-3.5 h-3.5" />
                  {t("deals.spots", { n: deal.spotsLeft })}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">{t(deal.titleKey)}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4"><Clock className="w-4 h-4" />{deal.duration}</div>
                <div className="flex items-end gap-3 mb-5">
                  <p className="text-sm text-gray-400 line-through">{deal.originalPrice}</p>
                  <p className="text-3xl font-bold text-[#F97316]">{deal.price}</p>
                  <p className="text-sm text-gray-400 mb-0.5">{t("deals.person")}</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 hover:shadow-lg transition-all group">
                  {t("deals.grab")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}