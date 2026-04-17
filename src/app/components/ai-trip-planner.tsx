import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Bot, User, Send, MessageCircle } from "lucide-react";
import { useLang } from "./language-context";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function AiTripPlanner() {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      const container = chatEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleGenerate = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1fe72b48/ai-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ message: text, lang }),
        }
      );

      const data = await res.json();
      if (data.error) {
        console.error("AI plan error:", data.error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t("ai.error") },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      console.error("AI plan fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("ai.error") },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessage = (text: string) => {
    // Convert telegram links to clickable
    const parts = text.split(/(https:\/\/t\.me\/\S+)/g);
    return parts.map((part, i) =>
      part.startsWith("https://t.me/") ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F97316] underline font-semibold hover:text-[#EA580C] transition-colors"
        >
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <section id="planner" className="py-24 bg-gradient-to-b from-white to-[#FFF7ED]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/10 to-[#F472B6]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span className="text-[#F97316] font-semibold text-sm">{t("ai.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">{t("ai.title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("ai.desc")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl shadow-xl shadow-orange-500/5 border border-gray-100 overflow-hidden">
          <div className="p-6 min-h-[350px] max-h-[500px] overflow-y-auto space-y-4 scroll-smooth">
            {/* Greeting */}
            <div className="flex gap-3">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-5 py-3 max-w-md">
                <p className="text-gray-700 text-sm">{t("ai.greeting")}</p>
              </div>
            </div>

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-5 py-3 max-w-lg text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-tr-sm"
                      : "bg-gray-50 text-gray-700 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-[#0F172A] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-5 py-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }} className="w-2 h-2 bg-[#F97316] rounded-full" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder={t("ai.placeholder")}
                disabled={isTyping}
                className="flex-1 px-5 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#F97316]/30 transition-all text-[#0F172A] disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerate}
                disabled={isTyping || !input.trim()}
                className="px-5 py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {t("ai.generate")}
              </motion.button>
            </div>
            <div className="flex items-center gap-2 mt-3 justify-center">
              <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-xs text-gray-400">{t("ai.telegram_hint")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}