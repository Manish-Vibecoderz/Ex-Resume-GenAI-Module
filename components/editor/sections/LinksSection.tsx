'use client';

import React from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { LinkItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export function LinksSection() {
    const { resumeData, addLink, updateLink, removeLink } = useResumeStore();

    const handleAdd = () => {
        const newItem: LinkItem = {
            id: uuidv4(),
            label: '',
            url: '',
        };
        addLink(newItem);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">Links</h2>
                    <p className="text-sm text-gray-500">
                        Add portfolio links, social media, etc.
                    </p>
                </div>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Link
                </Button>
            </div>

            <div className="space-y-4">
                {resumeData.links.map((link) => (
                    <div key={link.id} className="flex gap-4 items-end">
                        <div className="grid gap-2 flex-1">
                            <Label>Label</Label>
                            <Input
                                value={link.label}
                                onChange={(e) => updateLink(link.id, { label: e.target.value })}
                                placeholder="Portfolio"
                            />
                        </div>
                        <div className="grid gap-2 flex-[2]">
                            <Label>URL</Label>
                            <Input
                                value={link.url}
                                onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 mb-0.5"
                            onClick={() => removeLink(link.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
