"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PromptStartPage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setError(null);

        try {
            const res = await fetch("/api/generateFromPrompt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Generation failed");

            const data = await res.json();
            router.push(`/editor?sessionId=${data.sessionId}`);
        } catch (err) {
            setError("Failed to generate resume. Please try again.");
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/start" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900">Generate with AI</h1>
                </div>

                <div className="space-y-4">
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-purple-900">Tell us about yourself</h3>
                                <p className="text-sm text-purple-700">
                                    Paste your bio, LinkedIn summary, or just type out your experience.
                                    We'll structure it into a professional resume.
                                </p>
                            </div>
                        </div>
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="I am a software engineer with 5 years of experience in React and Node.js. I worked at Google where I led a team of 5..."
                        className="w-full h-64 p-4 rounded-xl border border-zinc-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none text-zinc-900 placeholder:text-zinc-400"
                        disabled={isGenerating}
                    />
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500"
                    >
                        {error}
                    </motion.p>
                )}

                <div className="flex justify-end">
                    <Button
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || isGenerating}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating Draft...
                            </>
                        ) : (
                            "Generate Resume"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
