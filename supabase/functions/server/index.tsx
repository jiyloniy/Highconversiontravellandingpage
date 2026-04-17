import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1fe72b48/health", (c) => {
  return c.json({ status: "ok" });
});

// AI Trip Planner endpoint
app.post("/make-server-1fe72b48/ai-plan", async (c) => {
  try {
    const { message, lang } = await c.req.json();
    if (!message || typeof message !== "string") {
      return c.json({ error: "Message is required" }, 400);
    }

    const apiKey = Deno.env.get("GPTKEY");
    if (!apiKey) {
      console.log("GPTKEY environment variable is not set");
      return c.json({ error: "AI service not configured" }, 500);
    }

    const langMap: Record<string, string> = {
      uz: "O'zbek tilida javob ber",
      ru: "Отвечай на русском языке",
      en: "Answer in English",
    };
    const langInstruction = langMap[lang] || langMap["uz"];

    const systemPrompt = `Sen Mandarin Tour sayohat agentligining professional sayohat maslahatchisisiz. ${langInstruction}.

Sening vazifang:
- Foydalanuvchilarga sayohat bo'yicha maslahat berish (mamlakatlar, shaharlar, diqqatga sazovor joylar, madaniyat, taom, ob-havo, viza, transport va boshqalar)
- Sayohat marshrutlarini tavsiya qilish
- Narx yoki baho AYTMA. Narx so'ralsa, aniq narxlar uchun Telegram kanalimizga murojaat qilishni tavsiya et: https://t.me/mandarintour_namangaan
- Javoblarni qisqa va foydali tut (maksimum 300 so'z)
- Har bir javob oxirida "Batafsil ma'lumot va bron uchun bizga murojaat qiling: https://t.me/mandarintour_namangaan" deb yoz
- Doimo samimiy va professional bo'l`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`OpenAI API error: ${response.status} - ${errorText}`);
      return c.json({ error: `AI service error: ${response.status}` }, 500);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Xatolik yuz berdi.";

    return c.json({ reply });
  } catch (err) {
    console.log(`AI plan error: ${err}`);
    return c.json({ error: `Server error: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);