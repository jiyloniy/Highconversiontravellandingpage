import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLang } from "./language-context";
import { LanguageSwitcher } from "./language-switcher";
import logoHorizontal from "../../imports/01_horizontal@2x-8_(2).png";
import logoIcon from "../../imports/LOGO.png";

export function Navigation({ solid = false }: { solid?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(solid);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang } = useLang();

  const navLinks = [
    { name: t("nav.destinations"), href: "/#destinations" },
    { name: t("nav.experiences"), href: "/#experiences" },
    { name: t("nav.deals"), href: "/#deals" },
    { name: t("nav.planner"), href: "/#planner" },
    { name: t("nav.community"), href: "/#community" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(solid || window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.a href="/" className="flex items-center gap-2 group" whileHover={{ scale: 1.05 }}>
              <img
                src={logoHorizontal}
                alt="Mandarin Tour"
                className={`hidden sm:block h-10 w-auto transition-all ${isScrolled ? "" : "brightness-0 invert"}`}
              />
              <img
                src={logoIcon}
                alt="Mandarin Tour"
                className={`sm:hidden h-10 w-auto transition-all ${isScrolled ? "" : "brightness-0 invert"}`}
              />
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              <motion.a
                href="/tours"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-medium transition-colors hover:text-[#F97316] ${isScrolled ? "text-gray-700" : "text-white/90"}`}
              >
                {lang === 'en' ? 'Tours' : lang === 'ru' ? 'Туры' : 'Turlar'}
              </motion.a>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`font-medium transition-colors hover:text-[#F97316] ${isScrolled ? "text-gray-700" : "text-white/90"}`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher isScrolled={isScrolled} />
              <motion.a
                href="https://t.me/mandarintour_namangaan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
                  isScrolled
                    ? "bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-orange-500/25"
                    : "bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/25"
                }`}
              >
                {t("nav.cta")}
              </motion.a>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher isScrolled={isScrolled} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              <motion.a
                href="/tours"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-4 text-2xl font-semibold text-[#0F172A] border-b border-gray-100 hover:text-[#F97316] transition-colors"
              >
                {lang === 'en' ? 'Tours' : lang === 'ru' ? 'Туры' : 'Turlar'}
              </motion.a>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 1) * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-2xl font-semibold text-[#0F172A] border-b border-gray-100 hover:text-[#F97316] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="https://t.me/mandarintour_namangaan"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.cta")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}