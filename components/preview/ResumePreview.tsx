'use client';

import React from 'react';
import { useResumeStore } from '@/lib/store/useResumeStore';
import { cn } from '@/lib/utils';

export function ResumePreview() {
    const { resumeData } = useResumeStore();

    // A4 Aspect Ratio Container
    return (
        <div className="relative min-h-[297mm] w-full bg-white shadow-2xl transition-all duration-300 ease-in-out print:shadow-none">
            {/* Minimal Template Rendering */}
            <div className="p-[25mm] text-gray-900">

                {/* Header */}
                <header className="mb-8 border-b border-gray-200 pb-6">
                    <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
                        {resumeData.personal.fullName || 'Your Name'}
                    </h1>
                    <p className="mb-4 text-lg text-gray-600 font-medium">
                        {resumeData.personal.jobTitle || 'Job Title'}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        {resumeData.personal.email && (
                            <span>{resumeData.personal.email}</span>
                        )}
                        {resumeData.personal.phone && (
                            <span>• {resumeData.personal.phone}</span>
                        )}
                        {resumeData.personal.location && (
                            <span>• {resumeData.personal.location}</span>
                        )}
                        {resumeData.personal.website && (
                            <span>• {resumeData.personal.website}</span>
                        )}
                        {resumeData.personal.linkedin && (
                            <span>• {resumeData.personal.linkedin}</span>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {resumeData.summary && (
                    <section className="mb-8">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Professional Summary
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {resumeData.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="mb-1 flex items-baseline justify-between">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {exp.company}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="mb-2 text-sm font-medium text-gray-700">
                                        {exp.title}
                                    </div>
                                    <ul className="list-outside list-disc space-y-1 pl-4 text-sm text-gray-600">
                                        {exp.bullets.map((bullet, idx) => (
                                            <li key={idx}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Education
                        </h2>
                        <div className="space-y-4">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            {edu.institution}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-700">{edu.degree}</div>
                                    {edu.notes && (
                                        <p className="mt-1 text-sm text-gray-500">{edu.notes}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
