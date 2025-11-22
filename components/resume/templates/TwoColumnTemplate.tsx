import { ResumePresentation } from "@/types/resume";
import { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TemplateProps {
    data: ResumeData;
    presentation: ResumePresentation;
}

export function TwoColumnTemplate({ data, presentation }: TemplateProps) {
    const { primaryColor, accentColor, fontScale, density } = presentation;

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
                "w-full h-full bg-white flex min-h-[800px]",
                fontScaleMap[fontScale]
            )}
        >
            {/* Left Column */}
            <div
                className="w-1/3 p-6 text-white flex flex-col gap-6"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="text-center">
                    {/* Placeholder for photo if we had one */}
                    {presentation.showProfilePhoto && (
                        <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4" />
                    )}
                    <h1 className="font-bold text-xl mb-2">{data.personal.fullName}</h1>
                    <p className="text-white/80 text-sm">{data.personal.location}</p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-white/90">
                    <div className="break-words">{data.personal.email}</div>
                    <div>{data.personal.phone}</div>
                    {data.personal.linkedin && (
                        <div className="break-words">{data.personal.linkedin}</div>
                    )}
                </div>

                {data.skills.length > 0 && (
                    <div>
                        <h3 className="font-bold uppercase tracking-wider mb-3 border-b border-white/20 pb-1">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="bg-white/10 px-2 py-1 rounded text-sm"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {data.education.length > 0 && (
                    <div>
                        <h3 className="font-bold uppercase tracking-wider mb-3 border-b border-white/20 pb-1">
                            Education
                        </h3>
                        <div className="flex flex-col gap-4">
                            {data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold">{edu.institution}</div>
                                    <div className="text-sm opacity-90">{edu.degree}</div>
                                    <div className="text-xs opacity-70">
                                        {edu.startDate} - {edu.endDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column */}
            <div className="w-2/3 p-8 text-black">
                <div className={cn("flex flex-col", densityMap[density])}>
                    {data.summary && (
                        <section>
                            <h2
                                className="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 pb-1"
                                style={{ borderColor: accentColor, color: primaryColor }}
                            >
                                Profile
                            </h2>
                            <p className="leading-relaxed opacity-80">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2
                                className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1"
                                style={{ borderColor: accentColor, color: primaryColor }}
                            >
                                Experience
                            </h2>
                            <div className={cn("flex flex-col", densityMap[density])}>
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg">{exp.position}</h3>
                                            <span className="text-sm font-medium text-gray-500">
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                        </div>
                                        <div className="font-medium text-gray-700 mb-2">
                                            {exp.company}
                                        </div>
                                        <p className="text-sm leading-relaxed opacity-80">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
