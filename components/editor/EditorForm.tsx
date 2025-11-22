'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { User, Briefcase, GraduationCap, Wrench, Link as LinkIcon, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonalSection } from './sections/PersonalSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { LinksSection } from './sections/LinksSection';

type Section = 'personal' | 'summary' | 'experience' | 'skills' | 'education' | 'links';

export function EditorForm() {
    const [activeSection, setActiveSection] = useState<Section>('personal');

    const navItems = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'summary', label: 'Summary', icon: Layers },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'skills', label: 'Skills', icon: Wrench },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'links', label: 'Links', icon: LinkIcon },
    ] as const;

    return (
        <div className="flex h-full flex-col">
            {/* Top Navigation Bar */}
            <div className="border-b border-gray-100 bg-white px-4 py-2">
                <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeSection === item.id ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveSection(item.id as Section)}
                            className={cn(
                                "flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium transition-all",
                                activeSection === item.id
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <ScrollArea className="flex-1 px-6 py-6">
                <div className="mx-auto max-w-2xl pb-20">
                    {activeSection === 'personal' && <PersonalSection />}
                    {activeSection === 'summary' && <SummarySection />}
                    {activeSection === 'experience' && <ExperienceSection />}
                    {activeSection === 'skills' && <SkillsSection />}
                    {activeSection === 'education' && <EducationSection />}
                    {activeSection === 'links' && <LinksSection />}
                </div>
            </ScrollArea>
        </div>
    );
}
