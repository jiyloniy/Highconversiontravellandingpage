import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Globe } from "lucide-react";
import { useLang, type Lang } from "./language-context";

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "uz", label: "O'zbekcha", flag: "UZ" },
];

export function LanguageSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
          isScrolled
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
        }`}
      >
        <Globe className="w-4 h-4" />
        {current.flag}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[140px]"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                    lang === l.code ? "bg-orange-50 text-[#F97316]" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-bold text-xs w-6">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
