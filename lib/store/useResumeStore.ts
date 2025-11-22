import { create } from 'zustand';
import { ResumeData, initialResumeData, ExperienceItem, SkillItem, EducationItem, LinkItem, CustomSection } from '@/lib/types';

interface ResumeStore {
    resumeData: ResumeData;
    isLoading: boolean;
    isSaving: boolean;
    sessionId: string | null;

    // Actions
    setResumeData: (data: ResumeData) => void;
    setSessionId: (id: string) => void;
    setIsLoading: (loading: boolean) => void;
    setIsSaving: (saving: boolean) => void;

    // Section Updates
    updatePersonal: (personal: Partial<ResumeData['personal']>) => void;
    updateSummary: (summary: string) => void;

    // Experience
    addExperience: (item: ExperienceItem) => void;
    updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
    removeExperience: (id: string) => void;
    reorderExperience: (items: ExperienceItem[]) => void;

    // Skills
    addSkill: (item: SkillItem) => void;
    removeSkill: (id: string) => void;
    updateSkill: (id: string, item: Partial<SkillItem>) => void;

    // Education
    addEducation: (item: EducationItem) => void;
    updateEducation: (id: string, item: Partial<EducationItem>) => void;
    removeEducation: (id: string) => void;
    reorderEducation: (items: EducationItem[]) => void;

    // Links
    addLink: (item: LinkItem) => void;
    updateLink: (id: string, item: Partial<LinkItem>) => void;
    removeLink: (id: string) => void;

    // Custom Sections
    addCustomSection: (section: CustomSection) => void;
    updateCustomSection: (id: string, section: Partial<CustomSection>) => void;
    removeCustomSection: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialResumeData,
    isLoading: false,
    isSaving: false,
    sessionId: null,

    setResumeData: (data) => set({ resumeData: data }),
    setSessionId: (id) => set({ sessionId: id }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setIsSaving: (saving) => set({ isSaving: saving }),

    updatePersonal: (personal) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                personal: { ...state.resumeData.personal, ...personal },
            },
        })),

    updateSummary: (summary) =>
        set((state) => ({
            resumeData: { ...state.resumeData, summary },
        })),

    addExperience: (item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [...state.resumeData.experience, item],
            },
        })),

    updateExperience: (id, item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.map((exp) =>
                    exp.id === id ? { ...exp, ...item } : exp
                ),
            },
        })),

    removeExperience: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.filter((exp) => exp.id !== id),
            },
        })),

    reorderExperience: (items) =>
        set((state) => ({
            resumeData: { ...state.resumeData, experience: items },
        })),

    addSkill: (item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...state.resumeData.skills, item],
            },
        })),

    removeSkill: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((skill) => skill.id !== id),
            },
        })),

    updateSkill: (id, item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.map((skill) =>
                    skill.id === id ? { ...skill, ...item } : skill
                ),
            },
        })),

    addEducation: (item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, item],
            },
        })),

    updateEducation: (id, item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.map((edu) =>
                    edu.id === id ? { ...edu, ...item } : edu
                ),
            },
        })),

    removeEducation: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((edu) => edu.id !== id),
            },
        })),

    reorderEducation: (items) =>
        set((state) => ({
            resumeData: { ...state.resumeData, education: items },
        })),

    addLink: (item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                links: [...state.resumeData.links, item],
            },
        })),

    updateLink: (id, item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                links: state.resumeData.links.map((link) =>
                    link.id === id ? { ...link, ...item } : link
                ),
            },
        })),

    removeLink: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                links: state.resumeData.links.filter((link) => link.id !== id),
            },
        })),

    addCustomSection: (section) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customSections: [...state.resumeData.customSections, section],
            },
        })),

    updateCustomSection: (id, section) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customSections: state.resumeData.customSections.map((sec) =>
                    sec.id === id ? { ...sec, ...section } : sec
                ),
            },
        })),

    removeCustomSection: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customSections: state.resumeData.customSections.filter(
                    (sec) => sec.id !== id
                ),
            },
        })),
}));
