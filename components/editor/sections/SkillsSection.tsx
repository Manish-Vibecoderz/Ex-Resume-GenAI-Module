'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Wand2, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/lib/toast';

export function SkillsSection() {
    const { resumeData, addSkill, removeSkill, setResumeData } = useResumeStore();
    const [newSkill, setNewSkill] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAdd = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newSkill.trim()) return;
        addSkill({
            id: uuidv4(),
            name: newSkill.trim(),
        });
        setNewSkill('');
    };

    const handleAiGenerate = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/ai/generateSkills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ structuredData: resumeData }),
            });
            const data = await response.json();
            if (data.result && Array.isArray(data.result)) {
                id: uuidv4(),
                    name,
                }));
            // Append new skills
            setResumeData({
                ...resumeData,
                skills: [...resumeData.skills, ...newSkills],
            });
            toast.success('Skills generated successfully');
        }
        } catch (error) {
        console.error(error);
        toast.error('Failed to generate skills');
    } finally {
        setIsGenerating(false);
    }
};

return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <p className="text-sm text-gray-500">
                    List your technical and soft skills.
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={handleAiGenerate}
                disabled={isGenerating}
                className="gap-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
            >
                {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="h-4 w-4" />
                )}
                AI Suggest
            </Button>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
            <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g. React, Python)"
            />
            <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
            </Button>
        </form>

        <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
                <div
                    key={skill.id}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                >
                    {skill.name}
                    <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-200 text-gray-500"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}
        </div>
    </div>
);
}
