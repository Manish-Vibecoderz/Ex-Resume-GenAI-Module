"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Sparkles, Linkedin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const modes = [
    {
        id: "manual",
        title: "Create Manually",
        description: "Start from scratch with a blank template.",
        icon: FileText,
        href: "/start/manual",
        color: "bg-zinc-100 text-zinc-900",
    },
    {
        id: "upload",
        title: "Upload Resume",
        description: "We'll extract info from your PDF or DOCX.",
        icon: Upload,
        href: "/start/upload",
        color: "bg-blue-50 text-blue-600",
    },
    {
        id: "prompt",
        title: "Generate with AI",
        description: "Describe your background, we'll write it.",
        icon: Sparkles,
        href: "/start/prompt",
        color: "bg-purple-50 text-purple-600",
    },
    {
        id: "linkedin",
        title: "Import LinkedIn",
        description: "Turn your LinkedIn profile into a resume.",
        icon: Linkedin,
        href: "/start/linkedin",
        color: "bg-blue-50 text-[#0077b5]",
    },
    {
        id: "chatbot",
        title: "Chat with AI",
        description: "Answer questions to build your resume.",
        icon: MessageSquare,
        href: "/start/chatbot",
        color: "bg-green-50 text-green-600",
    },
];

export default function StartPage() {
    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold tracking-tight text-zinc-900"
                    >
                        How would you like to start?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500"
                    >
                        Choose the best way to begin your resume journey.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modes.map((mode, index) => (
                        <Link key={mode.id} href={mode.href} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="h-full p-6 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col items-start gap-4"
                            >
                                <div className={cn("p-3 rounded-lg", mode.color)}>
                                    <mode.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-900 group-hover:text-black">
                                        {mode.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 mt-1">
                                        {mode.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
