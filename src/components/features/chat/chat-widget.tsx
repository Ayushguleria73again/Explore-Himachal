"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, Landmark, Compass, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
}

const CHIP_SUGGESTIONS = [
  { text: "🍲 What is a traditional Dham?", label: "Dham Feast" },
  { text: "🏔️ Best treks in Lahaul-Spiti?", label: "Spiti Trekking" },
  { text: "🪂 How to reach Bir Billing?", label: "Bir Paragliding" },
  { text: "🎨 Famous local handicrafts?", label: "Art & Crafts" },
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

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Namaste! 🙏 I am Mela Ram, your local guide to the Land of Gods. Ask me anything about the routes, cultural fairs, native foods, or hidden valleys of Himachal Pradesh!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

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
      // Package conversation history to keep context
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
      
      // Initialize message with the first word
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
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute bottom-20 right-0 w-[360px] h-[540px] max-w-[90vw] bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Window Header */}
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center shadow-lg shadow-emerald-900/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-xl text-white relative">
                  M
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wider leading-none">Mela Ram</h4>
                  <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mt-1 block">Local Travel Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-emerald-700/50 hover:bg-emerald-500 rounded-xl transition-colors text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar select-none bg-emerald-50/10">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed font-medium shadow-sm border whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white border-emerald-500 rounded-tr-sm"
                        : "bg-white text-gray-800 border-gray-100 rounded-tl-sm"
                    }`}
                  >
                    {formatMessageContent(msg.content, msg.role)}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-100 p-4 px-6 rounded-3xl rounded-tl-sm flex items-center gap-4 shadow-sm select-none">
                    <motion.div 
                      className="flex gap-1 items-center h-3"
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
                              y: [0, -5, 0],
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

            {/* Quick Suggest Chips - Only show on initial welcome state to preserve chat feed space */}
            {messages.length === 1 && (
              <div className="px-6 py-3 border-t border-emerald-50/50 bg-emerald-50/5 overflow-x-auto flex gap-2 no-scrollbar scroll-smooth shrink-0 select-none">
                {CHIP_SUGGESTIONS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.text)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-4 py-2.5 bg-emerald-50/80 hover:bg-emerald-600 hover:text-white border border-emerald-100/50 hover:border-emerald-600 text-emerald-800 text-[9px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 disabled:opacity-50 shrink-0 shadow-sm"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* User Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Dham, routes, weather..."
                disabled={isLoading}
                className="flex-grow px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-50 font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-40 shadow-lg shadow-emerald-600/20 shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-colors relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
