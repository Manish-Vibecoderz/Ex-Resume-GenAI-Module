'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { EditorForm } from '@/components/editor/EditorForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Loader2 } from 'lucide-react';
import { ResumePresentation } from '@/types/resume';

const DEFAULT_PRESENTATION: ResumePresentation = {
    templateId: "minimal",
    primaryColor: "#000000",
    accentColor: "#333333",
    fontScale: "md",
    showProfilePhoto: false,
    density: "cozy",
};

export default function EditorPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const { setSessionId, setResumeData, setIsLoading, isLoading, resumeData } = useResumeStore();
    const [presentation, setPresentation] = useState<ResumePresentation>(DEFAULT_PRESENTATION);

    useEffect(() => {
        if (sessionId) {
            setSessionId(sessionId);
            setIsLoading(true);
            fetch(`/api/session?sessionId=${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.structuredData) {
                        setResumeData(data.structuredData);
                        if (data.structuredData.presentation) {
                            setPresentation(data.structuredData.presentation);
                        }
                    }
                })
                .catch((err) => console.error('Failed to load session:', err))
                .finally(() => setIsLoading(false));
        }
    }, [sessionId, setSessionId, setResumeData, setIsLoading]);


    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <main className="flex h-screen w-full overflow-hidden bg-[#F3F4F6]">
            {/* Left Panel - Editor Form */}
            <div className="w-1/2 min-w-[500px] max-w-[650px] border-r border-gray-200 bg-white shadow-sm z-10 flex flex-col">
                <EditorForm />
            </div>

            {/* Right Panel - Live Preview */}
            <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-8 flex justify-center">
                <div className="w-full max-w-[210mm]">
                    <ResumePreview data={resumeData} presentation={presentation} />
                </div>
            </div>
        </main>
    );
}
