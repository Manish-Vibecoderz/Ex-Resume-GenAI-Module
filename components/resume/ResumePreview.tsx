import { ResumePresentation } from "@/types/resume";
import { ResumeData } from "@/lib/types";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { TwoColumnTemplate } from "./templates/TwoColumnTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";

interface ResumePreviewProps {
    data: ResumeData;
    presentation: ResumePresentation;
    className?: string;
}

export function ResumePreview({ data, presentation, className }: ResumePreviewProps) {
    const TemplateComponent = {
        minimal: MinimalTemplate,
        twoColumn: TwoColumnTemplate,
        classic: ClassicTemplate,
        compact: MinimalTemplate, // Fallback
        executive: ClassicTemplate, // Fallback
    }[presentation.templateId];

    return (
        <div className={className}>
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden text-left origin-top transform scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-100 transition-transform duration-300 ease-in-out">
                <TemplateComponent data={data} presentation={presentation} />
            </div>
        </div>
    );
}
