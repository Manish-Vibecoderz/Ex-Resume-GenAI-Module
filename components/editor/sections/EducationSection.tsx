'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { EducationItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export function EducationSection() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAdd = () => {
        const newItem: EducationItem = {
            id: uuidv4(),
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false,
        };
        addEducation(newItem);
        setExpandedId(newItem.id);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">Education</h2>
                    <p className="text-sm text-gray-500">
                        Add your educational background.
                    </p>
                </div>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Education
                </Button>
            </div>

            <div className="space-y-4">
                {resumeData.education.map((edu) => (
                    <div
                        key={edu.id}
                        className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all"
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                        >
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {edu.institution || '(No Institution)'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {edu.degree} {edu.fieldOfStudy ? `- ${edu.fieldOfStudy}` : ''}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeEducation(edu.id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                {expandedId === edu.id ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        </div>

                        {expandedId === edu.id && (
                            <div className="border-t border-gray-100 p-4 space-y-4">
                                <div className="grid gap-2">
                                    <Label>Institution</Label>
                                    <Input
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Degree</Label>
                                        <Input
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Field of Study</Label>
                                        <Input
                                            value={edu.fieldOfStudy}
                                            onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Start Date</Label>
                                        <Input
                                            value={edu.startDate}
                                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                            placeholder="YYYY"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>End Date</Label>
                                        <Input
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                            placeholder="YYYY"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
