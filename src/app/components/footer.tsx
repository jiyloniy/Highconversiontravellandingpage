import { motion } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Send } from "lucide-react";
import { useLang } from "./language-context";
import logoText from "../../imports/LOGO_text.png";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const socialLinks = [
  { icon: "instagram" as const, href: "https://www.instagram.com/namangan_tour1", label: "Instagram" },
  { icon: "telegram" as const, href: "https://t.me/mandarintour_namangaan", label: "Telegram" },
];

export function Footer() {
  const { t } = useLang();

  const footerSections = [
    { titleKey: "footer.company" as const, links: ["About Us", "Our Team", "Careers", "Press"] },
    { titleKey: "footer.support" as const, links: ["Help Center", "Safety", "Cancellation", "Contact Us"] },
    { titleKey: "footer.destinations" as const, links: ["Europe", "Asia", "Americas", "Africa"] },
    { titleKey: "footer.legal" as const, links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"] },
  ];

  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-r from-[#F97316]/15 to-[#F472B6]/15 backdrop-blur-sm rounded-3xl p-8 md:p-10 mb-16 border border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-2">{t("footer.newsletter_title")}</h4>
              <p className="text-white/60">{t("footer.newsletter_desc")}</p>
            </div>
            <div className="flex-1 flex gap-3 w-full md:w-auto">
              <input type="email" placeholder={t("footer.email_placeholder")} className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-[#F97316] transition-colors" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-orange-500/25">
                <Send className="w-4 h-4" />
                {t("footer.join")}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoText} alt="Mandarin Tour" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/50 mb-6 leading-relaxed text-sm">{t("footer.brand_desc")}</p>
            <div className="space-y-2.5 text-sm text-white/50">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#F97316]" /><a href="tel:+998953004444" className="hover:text-[#F97316] transition-colors">+998 95 300-44-44</a></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#F97316]" /><a href="tel:+998997674444" className="hover:text-[#F97316] transition-colors">+998 99 767-44-44</a></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F97316]" /><a href="mailto:mandarin_namangan@mail.ru" className="hover:text-[#F97316] transition-colors">mandarin_namangan@mail.ru</a></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#F97316]" /><span>Namangan shahar, Boburshoh ko'chasi 14 uy</span></div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="font-semibold mb-4 text-white">{t(section.titleKey)}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}><a href="#" className="text-white/50 hover:text-[#F97316] transition-colors text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#F97316] transition-colors"
                  aria-label={s.label}
                >
                  {s.icon === "instagram" ? (
                    <Instagram className="w-4 h-4" />
                  ) : (
                    <TelegramIcon className="w-4 h-4" />
                  )}
                </motion.a>
              ))}
            </div>
            <p className="text-white/40 text-sm">&copy; {t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
