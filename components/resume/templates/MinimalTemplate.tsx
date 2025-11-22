import { ResumePresentation } from "@/types/resume";
import { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TemplateProps {
    data: ResumeData;
    presentation: ResumePresentation;
}

export function MinimalTemplate({ data, presentation }: TemplateProps) {
    const { primaryColor, fontScale, density } = presentation;

    const densityMap = {
        comfortable: "gap-6",
        cozy: "gap-4",
        compact: "gap-2",
    };

    const fontScaleMap = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    const headingSizeMap = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
    };

    return (
        <div
            className={cn(
                "w-full h-full bg-white p-8 text-black font-sans",
                fontScaleMap[fontScale]
            )}
            style={{ color: primaryColor }}
        >
            {/* Header */}
            <header className="mb-8 border-b pb-4" style={{ borderColor: primaryColor }}>
                <h1
                    className={cn(
                        "font-bold tracking-tight mb-2",
                        headingSizeMap[fontScale]
                    )}
                >
                    {data.personal.fullName}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm opacity-80">
                    <span>{data.personal.email}</span>
                    <span>•</span>
                    <span>{data.personal.phone}</span>
                    <span>•</span>
                    <span>{data.personal.location}</span>
                    {data.personal.linkedin && (
                        <>
                            <span>•</span>
                            <span>{data.personal.linkedin}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Content */}
            <div className={cn("flex flex-col", densityMap[density])}>
                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="font-bold mb-2 uppercase tracking-wider text-sm opacity-70">Summary</h2>
                        <p className="leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="font-bold mb-3 uppercase tracking-wider text-sm opacity-70">Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold">{exp.position}</h3>
                                        <span className="text-sm opacity-70">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-medium opacity-80 mb-1">{exp.company}</div>
                                    <p className="text-sm leading-relaxed opacity-90">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="font-bold mb-3 uppercase tracking-wider text-sm opacity-70">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold">{edu.institution}</h3>
                                        <span className="text-sm opacity-70">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm opacity-90">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="font-bold mb-2 uppercase tracking-wider text-sm opacity-70">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
