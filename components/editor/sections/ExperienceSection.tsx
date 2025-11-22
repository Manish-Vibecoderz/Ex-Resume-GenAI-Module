'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Wand2, Loader2 } from 'lucide-react';
import { ExperienceItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/lib/toast';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
function SortableExperienceItem({
    exp,
    expandedId,
    setExpandedId,
    updateExperience,
    removeExperience
}: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: exp.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all mb-4"
        >
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
                <div className="flex items-center gap-3">
                    <div {...attributes} {...listeners} className="cursor-move touch-none">
                        <GripVertical className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">
                            {exp.company || '(No Company)'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {exp.position || '(No Position)'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeExperience(exp.id);
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    {expandedId === exp.id ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                </div>
            </div>

            {expandedId === exp.id && (
                <div className="border-t border-gray-100 p-4 space-y-4 cursor-default">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Job Title</Label>
                            <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Start Date</Label>
                            <Input
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                placeholder="MM/YYYY"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>End Date</Label>
                            <Input
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                placeholder="Present or MM/YYYY"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Description</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Call parent handler
                                    if (props.onAiRewrite) props.onAiRewrite(exp.id, exp.description);
                                }}
                                className="h-6 gap-1 text-xs text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                            >
                                <Wand2 className="h-3 w-3" />
                                AI Rewrite
                            </Button>
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            className="min-h-[100px]"
                            placeholder="• Achieved X by doing Y..."
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export function ExperienceSection() {
    const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = resumeData.experience.findIndex((item) => item.id === active.id);
            const newIndex = resumeData.experience.findIndex((item) => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                reorderExperience(arrayMove(resumeData.experience, oldIndex, newIndex));
            }
        }
    };

    const handleAdd = () => {
        const newItem: ExperienceItem = {
            id: uuidv4(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
        };
        addExperience(newItem);
        setExpandedId(newItem.id);
    };

    const handleAiRewrite = async (id: string, currentText: string) => {
        if (!currentText) {
            toast.error('Please enter some text first');
            return;
        }

        const toastId = toast.loading('Rewriting description...');
        try {
            const response = await fetch('/api/ai/genericRewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: currentText,
                    instruction: 'Improve this work experience description. Make it more professional, use action verbs, and format as bullet points if appropriate.',
                }),
            });

            const data = await response.json();
            if (data.result) {
                updateExperience(id, { description: data.result });
                toast.success('Description rewritten successfully');
            } else {
                toast.error('Failed to rewrite description');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
                    <p className="text-sm text-gray-500">
                        Add your professional experience. Drag to reorder.
                    </p>
                </div>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Position
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={resumeData.experience.map(exp => exp.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                            <SortableExperienceItem
                                key={exp.id}
                                exp={exp}
                                expandedId={expandedId}
                                setExpandedId={setExpandedId}
                                updateExperience={updateExperience}
                                removeExperience={removeExperience}
                                onAiRewrite={handleAiRewrite}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
