"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Compass, MessageSquare, Info, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
}

const CONSOLE_SUGGESTIONS = [
  { text: "🍲 Tell me about traditional Mandi Dham dishes and their spices.", label: "Dham Feast Lore" },
  { text: "🏔️ What is the best route and road conditions from Shimla to Spiti Valley?", label: "Shimla-Spiti Route" },
  { text: "🎨 What is the history of Kangra Miniature paintings?", label: "Kangra Miniatures" },
  { text: "❄️ What should I expect and pack for Kinnaur in October?", label: "Kinnaur Packing" },
];

function formatMessageContent(content: string, role: "user" | "model") {
  const lines = content.split("\n");
  
  return lines.map((line, lineIdx) => {
    if (line.trim() === "") {
      return <div key={lineIdx} className="h-3" />;
    }

    // Parse bold (**text**) and italic (*text*)
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    
    return (
      <div key={lineIdx} className="min-h-[1.2rem]">
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong 
                key={partIdx} 
                className={`font-black ${role === "user" ? "text-white" : "text-emerald-950 font-extrabold"}`}
              >
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em 
                key={partIdx} 
                className={`italic ${role === "user" ? "text-emerald-100" : "text-emerald-900 font-semibold"}`}
              >
                {part.slice(1, -1)}
              </em>
            );
          }
          return part;
        })}
      </div>
    );
  });
}

export function ChatConsole() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Namaste! 🙏 I am Mela Ram, your travel companion in the Himalayas. I can help you draft itineraries, locate high-altitude routes, check local packing guides, or tell you about ancient folk traditions. Ask me anything below!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          newPrompt: textToSend,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed.");
      }

      const data = await response.json();

      const msgId = `reply_${Date.now()}`;
      const replyText = data.reply || "I am currently unable to fetch a guide. Let us focus on the beauty of the valleys!";
      const words = replyText.split(" ");
      
      let displayedContent = words[0] || "";
      setMessages((prev) => [...prev, { id: msgId, role: "model", content: displayedContent }]);

      let i = 1;
      const timer = setInterval(() => {
        if (i < words.length) {
          displayedContent += " " + words[i];
          setMessages((prev) => 
            prev.map((m) => m.id === msgId ? { ...m, content: displayedContent } : m)
          );
          i++;
        } else {
          clearInterval(timer);
          setIsLoading(false);
        }
      }, 30);
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      const errorMsg: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "model",
        content: "Forgive me, but my connection to the mountains seems disrupted due to high demand. Please try asking again shortly! 🏔️",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch h-[680px]">
      {/* Left side info block */}
      <div className="bg-gray-50 border border-gray-100 p-10 rounded-[3rem] flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-emerald-600/20 relative shrink-0">
              M
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-950 uppercase tracking-tighter leading-tight">Mela Ram</h3>
              <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block mt-0.5">AI Travel Assistant</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-xs font-semibold leading-relaxed">
            Created in loving memory of the real Mela Ram—a retired Indian Army Subedar & Honorary Captain from Beh Bagroli, Kangra—our AI guide brings his authentic local warmth and travel wisdom to your Himalayan journey.
          </p>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-[11px] uppercase tracking-wider">
              <ShieldCheck size={14} /> Active Intel
            </div>
            <p className="text-[11px] text-emerald-700 font-medium leading-relaxed">
              Equipped with altitude packing guidelines, route navigation estimates, and cultural event calendars updated for 2026.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200/60">
          <div className="flex items-center gap-2 text-gray-400 font-extrabold text-[10px] uppercase tracking-wider">
            <Info size={12} /> Travel Guidelines
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed">
            Please cross-verify winter road blockages and monsoon landslips with government travel portals before embarking.
          </p>
        </div>
      </div>

      {/* Right side chat widget */}
      <div className="lg:col-span-2 bg-white border border-gray-100 shadow-2xl rounded-[3.5rem] overflow-hidden flex flex-col h-full relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[90px] -z-10" />

        {/* Chat Header */}
        <div className="px-10 py-6 border-b border-gray-100 flex items-center gap-3">
          <MessageSquare size={16} className="text-emerald-500" />
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Interactive Chat Session</span>
        </div>

        {/* Message Feed */}
        <div 
          ref={scrollContainerRef}
          className="flex-grow p-10 overflow-y-auto space-y-6 bg-emerald-50/5 custom-scrollbar"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-5 rounded-[2rem] text-sm leading-relaxed font-medium shadow-sm border whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white border-emerald-500 rounded-tr-sm"
                    : "bg-white text-gray-800 border-gray-100 rounded-tl-sm"
                }`}
              >
                {formatMessageContent(msg.content, msg.role)}
              </div>
            </motion.div>
          ))}

          {/* Typing Bouncing Dot Loader */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-100 p-5 px-8 rounded-[2rem] rounded-tl-sm flex items-center gap-4 shadow-sm">
                <motion.div 
                  className="flex gap-1.5 items-center h-3"
                  variants={{
                    animate: {
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                  initial="initial"
                  animate="animate"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      variants={{
                        initial: { y: 0 },
                        animate: {
                          y: [0, -6, 0],
                          transition: {
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    />
                  ))}
                </motion.div>
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest leading-none">Mela Ram is typing</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && (
          <div className="px-10 py-4 border-t border-emerald-50/50 bg-emerald-50/10 overflow-x-auto flex gap-3 no-scrollbar scroll-smooth">
            {CONSOLE_SUGGESTIONS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                disabled={isLoading}
                className="whitespace-nowrap px-5 py-3 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 disabled:opacity-50 shrink-0 shadow-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-6 bg-white border-t border-gray-100 flex gap-4 items-center"
        >
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={200}
              placeholder="Ask Mela Ram about weather, treks, festivals or Dham..."
              disabled={isLoading}
              className="w-full pl-6 pr-16 py-5 bg-gray-50 border border-gray-150 rounded-2xl text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-50 font-medium"
            />
            <span className="absolute right-6 text-[10px] font-bold text-gray-400 tracking-wider select-none bg-white/80 py-1 px-2 rounded-md">
              {input.length}/200
            </span>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-40 shadow-lg shadow-emerald-600/20 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
