export type ResumeTemplateId =
    | "minimal"
    | "classic"
    | "twoColumn"
    | "compact"
    | "executive";

export interface ResumePresentation {
    templateId: ResumeTemplateId;
    primaryColor: string;
    accentColor: string;
    fontScale: "sm" | "md" | "lg";
    showProfilePhoto: boolean;
    density: "comfortable" | "cozy" | "compact";
}

export interface ResumeStructuredData {
    personalDetails: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedinUrl?: string;
        websiteUrl?: string;
        summary: string;
    };
    experience: Array<{
        id: string;
        jobTitle: string;
        company: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    education: Array<{
        id: string;
        degree: string;
        school: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    skills: string[];
    projects?: Array<{
        id: string;
        name: string;
        description: string;
        url?: string;
    }>;
    presentation?: ResumePresentation;
}
