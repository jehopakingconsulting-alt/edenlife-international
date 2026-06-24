"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const QUICK_REPLIES_FR = [
  "Comment faire un don ?",
  "Comment devenir ambassadeur ?",
  "Quels sont vos projets ?",
  "Comment nous contacter ?",
];

const BOT_RESPONSES: Record<string, string> = {
  don: "Pour faire un don, rendez-vous sur notre page Dons. Vous pouvez donner par carte bancaire (Stripe), PayPal ou MonCash. Les dons peuvent être ponctuels ou mensuels. Chaque don est déductible d'impôts !",
  ambassadeur:
    "Pour devenir ambassadeur EDENLIFE, inscrivez-vous sur notre plateforme et sélectionnez le type 'Ambassadeur'. Vous accumulerez des points, recevrez des badges et pourrez participer à notre leaderboard mondial !",
  projet:
    "EDENLIFE International mène plus de 25 projets dans l'éducation, la santé, la formation professionnelle et le développement socio-économique. Visitez notre page Projets pour découvrir nos initiatives en cours.",
  contact:
    "Vous pouvez nous contacter par email à contact@edenlifeintl.org, par téléphone au +1 514-322-3762 (Canada) ou +509-3693-0687 (Haïti), ou via notre formulaire de contact en ligne.",
  formation:
    "EDENLIFE propose des formations gratuites en ligne : entrepreneuriat, marketing digital, santé communautaire, leadership et plus. Rendez-vous sur notre page E-Learning !",
  evenement:
    "Consultez notre page Événements pour voir nos prochaines activités : galas, conférences, marathons, formations et collectes de fonds.",
  default:
    "Merci pour votre message ! Je suis l'assistant virtuel d'EDENLIFE International. Je peux vous aider avec : les dons, devenir ambassadeur, nos projets, formations, événements ou contact. Comment puis-je vous aider ?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("don") || lower.includes("donat") || lower.includes("pay"))
    return BOT_RESPONSES.don;
  if (lower.includes("ambassad") || lower.includes("rejoin") || lower.includes("devenir"))
    return BOT_RESPONSES.ambassadeur;
  if (lower.includes("projet") || lower.includes("project") || lower.includes("initiat"))
    return BOT_RESPONSES.projet;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("téléphone") || lower.includes("phone"))
    return BOT_RESPONSES.contact;
  if (lower.includes("formation") || lower.includes("cours") || lower.includes("learn") || lower.includes("train"))
    return BOT_RESPONSES.formation;
  if (lower.includes("événement") || lower.includes("event") || lower.includes("gala") || lower.includes("marathon"))
    return BOT_RESPONSES.evenement;
  return BOT_RESPONSES.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bonjour ! Je suis l'assistant EDENLIFE. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      setTyping(false);
    }, 800);
  }

  return (
    <>
      {/* FAB Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          style={{ height: "500px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white shrink-0">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Assistant EDENLIFE</p>
              <p className="text-xs text-blue-200">En ligne</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_REPLIES_FR.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-blue-200 dark:border-blue-800 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
