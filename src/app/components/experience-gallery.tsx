import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useLang } from "./language-context";

export function ExperienceGallery() {
  const { t } = useLang();

  const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1647955950700-e74d397d4903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBhaXIlMjBiYWxsb29uJTIwY2FwcGFkb2NpYSUyMHN1bnJpc2V8ZW58MXx8fHwxNzc2NDA1Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story1" as const, tall: true },
    { id: 2, src: "https://images.unsplash.com/photo-1628371217613-714161455f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3ViYSUyMGRpdmluZyUyMGNvcmFsJTIwcmVlZiUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzc2NDA1Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story2" as const, tall: false },
    { id: 3, src: "https://images.unsplash.com/photo-1604403667191-ace082e0cf02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYSUyMGJvcmVhbGlzJTIwaWNlbGFuZHxlbnwxfHx8fDE3NzY0MDUyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story3" as const, tall: false },
    { id: 4, src: "https://images.unsplash.com/photo-1586367443498-8d0aa9de31bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHBlcnUlMjBhbmNpZW50JTIwcnVpbnN8ZW58MXx8fHwxNzc2NDA1MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story4" as const, tall: true },
    { id: 5, src: "https://images.unsplash.com/photo-1758346973244-4979d432025a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0JTIwYXNpYSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NjQwNTI4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story5" as const, tall: false },
    { id: 6, src: "https://images.unsplash.com/photo-1770564512542-19715fa4dc83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBtb3VudGFpbiUyMHRyYWlsJTIwYmFja3BhY2slMjBzY2VuaWN8ZW58MXx8fHwxNzc2NDA1MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", storyKey: "gallery.story6" as const, tall: false },
  ];

  return (
    <section id="experiences" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("gallery.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2 mb-4">{t("gallery.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("gallery.desc")}</p>
        </motion.div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
          <Masonry gutter="16px">
            {photos.map((photo, i) => (
              <motion.div key={photo.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${photo.tall ? "h-[420px]" : "h-[280px]"}`}>
                <img src={photo.src} alt={t(photo.storyKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold text-lg leading-snug">{t(photo.storyKey)}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F97316]/50 rounded-2xl transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
