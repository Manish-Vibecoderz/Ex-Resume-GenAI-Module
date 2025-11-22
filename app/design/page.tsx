"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResumePresentation } from "@/types/resume";
import { ResumeData } from "@/lib/types";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "./components/TemplateSelector";
import { ThemeControls } from "./components/ThemeControls";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

const DEFAULT_PRESENTATION: ResumePresentation = {
    templateId: "minimal",
    primaryColor: "#000000",
    accentColor: "#333333",
    fontScale: "md",
    showProfilePhoto: false,
    density: "cozy",
};

export default function DesignPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("sessionId");

    const [data, setData] = useState<ResumeData | null>(null);
    const [presentation, setPresentation] = useState<ResumePresentation>(DEFAULT_PRESENTATION);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!sessionId) return;

        const fetchSession = async () => {
            try {
                const res = await fetch(`/api/session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error("Failed to load session");
                const session = await res.json();

                if (session.structuredData) {
                    setData(session.structuredData);
                    if (session.structuredData.presentation) {
                        setPresentation(session.structuredData.presentation);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionId]);

    const savePresentation = async (newPresentation: ResumePresentation) => {
        if (!sessionId) return;
        setSaving(true);
        try {
            const res = await fetch("/api/session/presentation", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    presentation: newPresentation,
                }),
            });

            if (!res.ok) throw new Error("Failed to save");
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handlePresentationChange = (updates: Partial<ResumePresentation>) => {
        const newPresentation = { ...presentation, ...updates };
        setPresentation(newPresentation);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            savePresentation(newPresentation);
        }, 1000);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">No resume data found.</p>
                <Button onClick={() => router.push("/")}>Go Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Left Panel - Controls */}
            <div className="w-full md:w-[400px] bg-white border-r h-screen overflow-y-auto flex flex-col z-10 shadow-xl">
                <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/editor?sessionId=${sessionId}`)}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="font-bold text-lg">Design</h1>
                    </div>
                    {saving && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                </div>

                <div className="p-6 space-y-10">
                    <TemplateSelector
                        selectedTemplate={presentation.templateId}
                        onSelect={(id) => handlePresentationChange({ templateId: id })}
                    />

                    <div className="h-px bg-gray-100" />

                    <ThemeControls
                        presentation={presentation}
                        onChange={handlePresentationChange}
                    />
                </div>

                <div className="mt-auto p-6 border-t bg-gray-50">
                    <Button
                        className="w-full"
                        onClick={() => router.push(`/editor?sessionId=${sessionId}`)}
                    >
                        Done Editing
                    </Button>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 h-screen overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 overflow-auto p-8 flex items-start justify-center">
                    <ResumePreview data={data} presentation={presentation} className="shadow-2xl" />
                </div>
            </div>
        </div>
    );
}
