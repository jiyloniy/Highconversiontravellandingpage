import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "./language-context";

const destinations = [
  { id: 1, nameKey: "trending.georgia", image: "https://images.unsplash.com/photo-1760567260367-f8a6d01b0db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZW9yZ2lhJTIwVGJpbGlzaSUyMG9sZCUyMHRvd24lMjBzY2VuaWN8ZW58MXx8fHwxNzc2NDE3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$399", rating: 4.8, trending: true },
  { id: 2, nameKey: "trending.thailand", image: "https://images.unsplash.com/photo-1645108254499-5f9aa36b7665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZCUyMHRyb3BpY2FsJTIwYmVhY2glMjB0ZW1wbGV8ZW58MXx8fHwxNzc2NDE2ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$799", rating: 4.9, trending: true },
  { id: 3, nameKey: "trending.vietnam", image: "https://images.unsplash.com/photo-1605645854141-9f81b7f47fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwSGElMjBMb25nJTIwQmF5JTIwc2NlbmljJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NjQxNzY0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$899", rating: 4.7, trending: false },
  { id: 4, nameKey: "trending.dubai", image: "https://images.unsplash.com/photo-1735320862956-371e2ed96007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYSUyMG1vZGVybnxlbnwxfHx8fDE3NzY0MTc2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$650", rating: 4.8, trending: true },
  { id: 5, nameKey: "trending.bali", image: "https://images.unsplash.com/photo-1675349673331-5bd6398000b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWxpJTIwSW5kb25lc2lhJTIwcmljZSUyMHRlcnJhY2UlMjB0ZW1wbGV8ZW58MXx8fHwxNzc2NDE3NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$1,199", rating: 4.9, trending: true },
  { id: 6, nameKey: "trending.egypt", image: "https://images.unsplash.com/photo-1705874930271-88eeb8f533dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMHB5cmFtaWRzJTIwR2l6YSUyMGRlc2VydHxlbnwxfHx8fDE3NzY0MTc2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$750", rating: 4.7, trending: false },
  { id: 7, nameKey: "trending.turkey", image: "https://images.unsplash.com/photo-1554388110-e8dbad26d195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUdXJrZXklMjBJc3RhbmJ1bCUyMENhcHBhZG9jaWElMjBiYWxsb29uc3xlbnwxfHx8fDE3NzY0MTc2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$750", rating: 4.8, trending: true },
  { id: 8, nameKey: "trending.azerbaijan", image: "https://images.unsplash.com/photo-1668048561929-622d8daadba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBemVyYmFpamFuJTIwQmFrdSUyMGZsYW1lJTIwdG93ZXJzJTIwY2l0eXxlbnwxfHx8fDE3NzY0MTc2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", price: "$350", rating: 4.6, trending: false },
];

export function TrendingDestinations() {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = destinations.length - visibleCount;

  const goTo = useCallback((idx: number, dir?: number) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setDirection(dir ?? (clamped > currentIndex ? 1 : -1));
    setCurrentIndex(clamped);
  }, [currentIndex, maxIndex]);

  const next = useCallback(() => {
    if (currentIndex >= maxIndex) {
      goTo(0, 1);
    } else {
      goTo(currentIndex + 1, 1);
    }
  }, [currentIndex, maxIndex, goTo]);

  const prev = useCallback(() => {
    if (currentIndex <= 0) {
      goTo(maxIndex, -1);
    } else {
      goTo(currentIndex - 1, -1);
    }
  }, [currentIndex, maxIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("trending.subtitle")}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2">{t("trending.title")}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-11 h-11 rounded-xl flex items-center justify-center border bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white border-transparent shadow-lg shadow-orange-500/25 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-11 h-11 rounded-xl flex items-center justify-center border bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white border-transparent shadow-lg shadow-orange-500/25 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              onClick={() => window.location.href = '/tours'}
              className="text-[#F97316] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t("trending.viewall")} <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleDestinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: direction > 0 ? -100 : 100 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  whileHover={{ y: -8 }}
                  className="group flex-1 min-w-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-shadow duration-500 cursor-pointer border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={dest.image} alt={dest.nameKey} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {dest.trending && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                        <TrendingUp className="w-3.5 h-3.5" /> {t("trending.badge")}
                      </div>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#F97316]/20 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">{t(dest.nameKey as any)}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-gray-700">{dest.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{t("trending.starting")}</p>
                      <p className="text-xl font-bold text-[#F97316]">{dest.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 h-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] shadow-md shadow-orange-500/30"
                  : "w-3 h-3 bg-gray-300 hover:bg-[#F97316]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}