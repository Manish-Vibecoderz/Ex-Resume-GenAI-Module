'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wand2, Loader2 } from 'lucide-react';
import { toast } from '@/lib/toast';

export function SummarySection() {
    const { resumeData, updateSummary } = useResumeStore();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAiRewrite = async () => {
        if (!resumeData.summary) {
            toast.error('Please enter some text first');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await fetch('/api/ai/summaryWrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentSummary: resumeData.summary,
                    instruction: 'Make it more professional and concise.',
                }),
            });

            const data = await response.json();
            if (data.result) {
                updateSummary(data.result);
                toast.success('Summary rewritten successfully');
            } else {
                toast.error('Failed to rewrite summary');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">Professional Summary</h2>
                    <p className="text-sm text-gray-500">
                        A brief overview of your career and goals.
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAiRewrite}
                    disabled={isGenerating}
                    className="gap-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                >
                    {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="h-4 w-4" />
                    )}
                    AI Rewrite
                </Button>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary" className="sr-only">
                    Summary
                </Label>
                <Textarea
                    id="summary"
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    placeholder="Experienced software engineer with a passion for building scalable web applications..."
                    className="min-h-[200px] resize-none text-base leading-relaxed"
                />
            </div>
        </div>
    );
}
