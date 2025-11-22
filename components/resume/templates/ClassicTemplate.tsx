import { ResumePresentation } from "@/types/resume";
import { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TemplateProps {
    data: ResumeData;
    presentation: ResumePresentation;
}

export function ClassicTemplate({ data, presentation }: TemplateProps) {
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

    return (
        <div
            className={cn(
                "w-full h-full bg-white p-10 text-black font-serif",
                fontScaleMap[fontScale]
            )}
        >
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>
                    {data.personal.fullName}
                </h1>
                <div className="flex justify-center flex-wrap gap-4 text-sm italic border-t border-b border-gray-300 py-2">
                    <span>{data.personal.email}</span>
                    <span>{data.personal.phone}</span>
                    <span>{data.personal.location}</span>
                    {data.personal.linkedin && (
                        <span>{data.personal.linkedin}</span>
                    )}
                </div>
            </header>

            <div className={cn("flex flex-col", densityMap[density])}>
                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="text-center font-bold uppercase text-sm tracking-widest mb-3 border-b border-gray-300 pb-1">
                            Professional Summary
                        </h2>
                        <p className="text-justify leading-relaxed">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-center font-bold uppercase text-sm tracking-widest mb-4 border-b border-gray-300 pb-1">
                            Work Experience
                        </h2>
                        <div className={cn("flex flex-col", densityMap[density])}>
                            {data.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3 className="text-lg">{exp.company}</h3>
                                        <span className="text-sm italic">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="italic mb-1">{exp.position}</div>
                                    <p className="text-sm leading-relaxed text-justify">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-center font-bold uppercase text-sm tracking-widest mb-4 border-b border-gray-300 pb-1">
                            Education
                        </h2>
                        <div className={cn("flex flex-col", densityMap[density])}>
                            {data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{edu.institution}</h3>
                                        <span className="text-sm italic">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="italic">{edu.degree}</div>
                                    {/* Education description not in ResumeData type, skipping */}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="text-center font-bold uppercase text-sm tracking-widest mb-3 border-b border-gray-300 pb-1">
                            Core Competencies
                        </h2>
                        <div className="text-center leading-relaxed">
                            {data.skills.map(s => s.name).join(" • ")}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
