"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ManualStartPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const createSession = async () => {
            try {
                const res = await fetch("/api/session/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mode: "manual" }),
                });

                if (!res.ok) throw new Error("Failed to create session");

                const data = await res.json();
                router.push(`/editor?sessionId=${data.id}`);
            } catch (err) {
                setError("Failed to initialize session. Please try again.");
            }
        };

        createSession();
    }, [router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <p className="text-zinc-500">Initializing your workspace...</p>
        </div>
    );
}
