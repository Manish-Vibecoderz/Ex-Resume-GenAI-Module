export interface ResumeReview {
    overallScore: number; // 0 to 100
    summaryRating: string; // short narrative
    strengths: string[]; // bullet points
    weakAreas: string[]; // bullet points
    quickTips: string[]; // short actionable items
    createdAt?: string; // ISO date string
}

export interface ResumeSession {
    id: string;
    userId?: string;
    structuredData: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExperienceItem {
    id: string;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    current: boolean;
}

export interface SkillItem {
    id: string;
    name: string;
    level?: string;
}

export interface LinkItem {
    id: string;
    label: string;
    url: string;
}

export interface CustomSection {
    id: string;
    title: string;
    items: { id: string; title: string; description: string }[];
}

import { ResumePresentation } from "@/types/resume";

export interface ResumeData {
    personal: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
    };
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillItem[];
    links: LinkItem[];
    customSections: CustomSection[];
    presentation?: ResumePresentation;
    review?: ResumeReview;
}

export const initialResumeData: ResumeData = {
    personal: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    links: [],
    customSections: [],
};
