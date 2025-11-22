"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Linkedin, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LinkedinStartPage() {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!url.trim()) return;

        // Basic validation
        if (!url.includes("linkedin.com/in/")) {
            setError("Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/username)");
            return;
        }

        setIsImporting(true);
        setError(null);

        try {
            const res = await fetch("/api/linkedinImport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!res.ok) throw new Error("Import failed");

            const data = await res.json();
            router.push(`/editor?sessionId=${data.sessionId}`);
        } catch (err) {
            setError("Failed to import from LinkedIn. Please check the URL or try another method.");
            setIsImporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/start" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900">Import LinkedIn</h1>
                </div>

                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-[#0077b5] rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-200">
                            <Linkedin className="w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-medium text-zinc-900">Connect your profile</h2>
                        <p className="text-zinc-500 text-sm">
                            We'll extract your experience, education, and skills to build your resume.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">LinkedIn Profile URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://www.linkedin.com/in/johndoe"
                            className="w-full p-3 rounded-lg border border-zinc-200 focus:border-[#0077b5] focus:ring-1 focus:ring-[#0077b5] outline-none text-zinc-900 placeholder:text-zinc-400"
                            disabled={isImporting}
                        />
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500 text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <Button
                    onClick={handleImport}
                    disabled={!url.trim() || isImporting}
                    className="w-full bg-[#0077b5] hover:bg-[#006097] text-white"
                >
                    {isImporting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Importing Profile...
                        </>
                    ) : (
                        "Import Profile"
                    )}
                </Button>
            </div>
        </div>
    );
}
