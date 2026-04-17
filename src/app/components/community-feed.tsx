import { motion } from "motion/react";
import { Heart, MessageCircle } from "lucide-react";
import { useLang } from "./language-context";

const posts = [
  { id: 1, image: "https://images.unsplash.com/photo-1662468872162-633462e31e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMHNxdWFyZSUyMFV6YmVraXN0YW4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc2NDI3Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", user: "dilnoza_travels", avatar: "https://images.unsplash.com/photo-1757076952608-4baa9cdf89fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzbWlsaW5nJTIwaGFwcHl8ZW58MXx8fHwxNzc2NDI3NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 1543, comments: 92 },
  { id: 2, image: "https://images.unsplash.com/photo-1774810306527-bd6e74d36e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwaGlzdG9yaWMlMjBjaXR5JTIwVXpiZWtpc3RhbiUyMHRyYXZlbHxlbnwxfHx8fDE3NzY0MjczOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", user: "aziz_adventure", avatar: "https://images.unsplash.com/photo-1774810305765-52542714e548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMG1hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIweW91bmd8ZW58MXx8fHwxNzc2NDI3NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 1287, comments: 68 },
  { id: 3, image: "https://images.unsplash.com/photo-1774429307447-d4c53a36ecc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUdXJrZXklMjBDYXBwYWRvY2lhJTIwaG90JTIwYWlyJTIwYmFsbG9vbnMlMjBzY2VuaWN8ZW58MXx8fHwxNzc2NDI3NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", user: "shohruh_world", avatar: "https://images.unsplash.com/photo-1774810305765-52542714e548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMG1hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIweW91bmd8ZW58MXx8fHwxNzc2NDI3NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 2340, comments: 156 },
  { id: 4, image: "https://images.unsplash.com/photo-1759745056970-e4ccca6ec5e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGJlYWNoJTIwcmVzb3J0JTIwbHV4dXJ5JTIwdHJhdmVsfGVufDF8fHx8MTc3NjQyNzQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", user: "madina_explorer", avatar: "https://images.unsplash.com/photo-1671973833358-5a817b220e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMHlvdW5nJTIwd29tYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzY0Mjc0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 968, comments: 47 },
];

export function CommunityFeed() {
  const { t } = useLang();

  return (
    <section id="community" className="py-24 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-[#F97316] font-semibold uppercase tracking-wider text-sm">{t("community.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-2 mb-4">{t("community.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("community.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.03 }} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md">
              <img src={post.image} alt={post.user} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0F172A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full border-2 border-white" />
                  <span className="text-white text-sm font-semibold">@{post.user}</span>
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}