"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
    structuredData: any;
    presentation?: any;
    className?: string;
}

export function ResumePreview({
    structuredData,
    presentation,
    className,
}: ResumePreviewProps) {
    if (!structuredData) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                No resume data available.
            </div>
        );
    }

    const { personalDetails, summary, experience, skills, education, extras } =
        structuredData;

    return (
        <div
            className={cn(
                "bg-white text-black p-8 shadow-sm border border-gray-200 min-h-[800px] w-full max-w-[210mm] mx-auto",
                className
            )}
            style={{
                fontFamily: presentation?.font || "Inter, sans-serif",
                fontSize: presentation?.scale ? `${presentation.scale}rem` : "1rem",
            }}
        >
            {/* Header */}
            <header className="mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    {personalDetails?.fullName || "Your Name"}
                </h1>
                <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                    {personalDetails?.email && <span>{personalDetails.email}</span>}
                    {personalDetails?.phone && <span>{personalDetails.phone}</span>}
                    {personalDetails?.location && <span>{personalDetails.location}</span>}
                    {personalDetails?.linkedin && (
                        <a href={personalDetails.linkedin} className="hover:underline">
                            LinkedIn
                        </a>
                    )}
                    {personalDetails?.website && (
                        <a href={personalDetails.website} className="hover:underline">
                            Website
                        </a>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Summary
                    </h2>
                    <p className="text-gray-800 leading-relaxed">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp: any, index: number) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900">
                                        {exp.position}
                                    </h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">
                                        {exp.startDate} - {exp.endDate || "Present"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{exp.company}</div>
                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu: any, index: number) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.institution}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {edu.startDate} - {edu.endDate || "Present"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill: any, index: number) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium"
                            >
                                {typeof skill === "string" ? skill : skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Extras */}
            {extras && extras.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Additional
                    </h2>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {extras.map((extra: any, index: number) => (
                            <li key={index}>{extra}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
