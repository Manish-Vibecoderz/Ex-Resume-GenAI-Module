/**
 * Validation schemas and helpers for resume data
 */

import { ResumeStructuredData } from '@/types/resume';

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

/**
 * Validate personal details
 */
export function validatePersonalDetails(data: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data.fullName || data.fullName.trim().length === 0) {
        errors.push('Full name is required');
    }

    if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Email format is invalid');
    }

    if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
        warnings.push('Phone number format may be invalid');
    }

    if (data.linkedinUrl && !isValidURL(data.linkedinUrl)) {
        warnings.push('LinkedIn URL format is invalid');
    }

    if (data.websiteUrl && !isValidURL(data.websiteUrl)) {
        warnings.push('Website URL format is invalid');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validate experience entry
 */
export function validateExperience(entry: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!entry.jobTitle || entry.jobTitle.trim().length === 0) {
        errors.push('Job title is required');
    }

    if (!entry.company || entry.company.trim().length === 0) {
        errors.push('Company name is required');
    }

    if (!entry.startDate) {
        errors.push('Start date is required');
    }

    if (!entry.endDate && !entry.current) {
        warnings.push('End date is missing');
    }

    if (entry.startDate && entry.endDate) {
        const start = new Date(entry.startDate);
        const end = new Date(entry.endDate);
        if (start > end) {
            errors.push('Start date cannot be after end date');
        }
    }

    if (!entry.description || entry.description.trim().length === 0) {
        warnings.push('Description is empty');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validate education entry
 */
export function validateEducation(entry: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!entry.degree || entry.degree.trim().length === 0) {
        errors.push('Degree is required');
    }

    if (!entry.school || entry.school.trim().length === 0) {
        errors.push('School name is required');
    }

    if (!entry.startDate) {
        warnings.push('Start date is missing');
    }

    if (!entry.endDate && !entry.current) {
        warnings.push('End date is missing');
    }

    if (entry.startDate && entry.endDate) {
        const start = new Date(entry.startDate);
        const end = new Date(entry.endDate);
        if (start > end) {
            errors.push('Start date cannot be after end date');
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validate entire resume structure
 */
export function validateResumeData(data: Partial<ResumeStructuredData>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate personal details
    if (data.personalDetails) {
        const personalValidation = validatePersonalDetails(data.personalDetails);
        errors.push(...personalValidation.errors);
        warnings.push(...personalValidation.warnings);
    } else {
        errors.push('Personal details are missing');
    }

    // Validate experience
    if (data.experience && data.experience.length > 0) {
        data.experience.forEach((exp, index) => {
            const expValidation = validateExperience(exp);
            errors.push(...expValidation.errors.map(e => `Experience ${index + 1}: ${e}`));
            warnings.push(...expValidation.warnings.map(w => `Experience ${index + 1}: ${w}`));
        });
    } else {
        warnings.push('No experience entries added');
    }

    // Validate education
    if (data.education && data.education.length > 0) {
        data.education.forEach((edu, index) => {
            const eduValidation = validateEducation(edu);
            errors.push(...eduValidation.errors.map(e => `Education ${index + 1}: ${e}`));
            warnings.push(...eduValidation.warnings.map(w => `Education ${index + 1}: ${w}`));
        });
    } else {
        warnings.push('No education entries added');
    }

    // Validate skills
    if (!data.skills || data.skills.length === 0) {
        warnings.push('No skills added');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Sanitize resume data to prevent XSS and ensure data integrity
 */
export function sanitizeResumeData(data: any): any {
    if (typeof data === 'string') {
        return data
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    if (Array.isArray(data)) {
        return data.map(sanitizeResumeData);
    }

    if (typeof data === 'object' && data !== null) {
        const sanitized: any = {};
        for (const key in data) {
            sanitized[key] = sanitizeResumeData(data[key]);
        }
        return sanitized;
    }

    return data;
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size === 0) {
        errors.push('File is empty');
    } else if (file.size > MAX_SIZE) {
        errors.push('File size exceeds 5MB limit');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push('File type must be PDF or DOCX');
    }

    if (file.size > 3 * 1024 * 1024) {
        warnings.push('Large file may take longer to process');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validate LinkedIn URL
 */
export function validateLinkedInURL(url: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!url || url.trim().length === 0) {
        errors.push('LinkedIn URL is required');
        return { isValid: false, errors, warnings };
    }

    if (!url.includes('linkedin.com/in/')) {
        errors.push('Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/username)');
    }

    try {
        const urlObj = new URL(url);
        if (!urlObj.hostname.includes('linkedin.com')) {
            errors.push('URL must be from linkedin.com');
        }
    } catch {
        errors.push('Invalid URL format');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validate prompt input
 */
export function validatePrompt(prompt: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!prompt || prompt.trim().length === 0) {
        errors.push('Prompt cannot be empty');
    }

    if (prompt.length < 20) {
        warnings.push('Prompt is very short. Consider adding more details for better results.');
    }

    if (prompt.length > 5000) {
        warnings.push('Very long prompt may be truncated');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Helper to check if URL is valid
 */
function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Calculate resume completeness score (0-100)
 */
export function calculateCompletenessScore(data: Partial<ResumeStructuredData>): number {
    let score = 0;
    const weights = {
        personalDetails: 30,
        experience: 30,
        education: 20,
        skills: 15,
        summary: 5,
    };

    // Personal details
    if (data.personalDetails) {
        let personalScore = 0;
        if (data.personalDetails.fullName) personalScore += 8;
        if (data.personalDetails.email) personalScore += 8;
        if (data.personalDetails.phone) personalScore += 5;
        if (data.personalDetails.location) personalScore += 4;
        if (data.personalDetails.summary) personalScore += 5;
        score += Math.min(personalScore, weights.personalDetails);
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
        const avgExperienceScore = data.experience.reduce((acc, exp) => {
            let expScore = 0;
            if (exp.jobTitle) expScore += 3;
            if (exp.company) expScore += 3;
            if (exp.startDate) expScore += 2;
            if (exp.description && exp.description.length > 50) expScore += 2;
            return acc + expScore;
        }, 0) / data.experience.length;
        score += Math.min(avgExperienceScore * 3, weights.experience);
    }

    // Education
    if (data.education && data.education.length > 0) {
        const avgEducationScore = data.education.reduce((acc, edu) => {
            let eduScore = 0;
            if (edu.degree) eduScore += 5;
            if (edu.school) eduScore += 5;
            return acc + eduScore;
        }, 0) / data.education.length;
        score += Math.min(avgEducationScore * 2, weights.education);
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
        score += Math.min(data.skills.length * 2, weights.skills);
    }

    return Math.round(Math.min(score, 100));
}
