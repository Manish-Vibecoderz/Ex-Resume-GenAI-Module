'use client';

import React from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PersonalSection() {
    const { resumeData, updatePersonal } = useResumeStore();
    const { personal } = resumeData;

    const handleChange = (field: keyof typeof personal, value: string) => {
        updatePersonal({ [field]: value });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
                <p className="text-sm text-gray-500">
                    Basic information for your resume header.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={personal.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Jane Doe"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                        id="jobTitle"
                        value={personal.jobTitle}
                        onChange={(e) => handleChange('jobTitle', e.target.value)}
                        placeholder="Software Engineer"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={personal.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="jane@example.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={personal.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={personal.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="San Francisco, CA"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={personal.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        placeholder="janedoe.com"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            value={personal.linkedin}
                            onChange={(e) => handleChange('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/jane"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                            id="github"
                            value={personal.github}
                            onChange={(e) => handleChange('github', e.target.value)}
                            placeholder="github.com/jane"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
