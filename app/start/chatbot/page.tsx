"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: "assistant" | "user";
    content: string;
};

export default function ChatbotStartPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hi there! I'm your AI resume assistant. I'll help you build a professional resume by asking a few questions. First, what is your full name?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isBuilding, setIsBuilding] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            // Simulate AI delay for now, or call actual chat endpoint
            // In a real implementation, this would call /api/ai/chat
            // For this step, we'll simulate a simple flow or call the build endpoint if done.

            // TODO: Replace with actual API call
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!res.ok) throw new Error("Chat failed");

            const data = await res.json();

            if (data.finished) {
                setIsBuilding(true);
                // Call build endpoint
                const buildRes = await fetch("/api/ai/buildResumeFromQA", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: [...messages, userMessage] }),
                });

                if (!buildRes.ok) throw new Error("Build failed");
                const buildData = await buildRes.json();
                router.push(`/editor?sessionId=${buildData.sessionId}`);
                return;
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message,
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            // Fallback for demo if API fails (since we haven't built it yet)
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "I'm having trouble connecting to the server. Please try again later.",
                    },
                ]);
            }, 1000);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="border-b border-zinc-100 p-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <Link href="/start" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-zinc-500" />
                </Link>
                <div>
                    <h1 className="font-semibold text-zinc-900">AI Resume Interviewer</h1>
                    <p className="text-xs text-zinc-500">Powered by GPT-4</p>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl mx-auto w-full">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-3 max-w-[80%]",
                                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                msg.role === "assistant" ? "bg-black text-white" : "bg-zinc-200 text-zinc-600"
                            )}>
                                {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed",
                                msg.role === "assistant"
                                    ? "bg-zinc-100 text-zinc-800 rounded-tl-none"
                                    : "bg-black text-white rounded-tr-none"
                            )}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 max-w-[80%]"
                    >
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-zinc-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-100 bg-white">
                <div className="max-w-3xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                        placeholder="Type your answer..."
                        className="flex-1 p-3 rounded-xl border border-zinc-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-zinc-900 placeholder:text-zinc-400"
                        disabled={isTyping || isBuilding}
                        autoFocus
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping || isBuilding}
                        className="h-full aspect-square rounded-xl bg-black hover:bg-zinc-800 text-white"
                    >
                        {isBuilding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
