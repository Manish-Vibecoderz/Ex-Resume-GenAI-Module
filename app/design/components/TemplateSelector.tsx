import { ResumeTemplateId } from "@/types/resume";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
    selectedTemplate: ResumeTemplateId;
    onSelect: (templateId: ResumeTemplateId) => void;
}

const templates: { id: ResumeTemplateId; name: string; description: string }[] = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean, single column, whitespace focused",
    },
    {
        id: "twoColumn",
        name: "Two Column",
        description: "Sidebar for skills, main content area",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional, serif fonts, formal layout",
    },
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Template
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        className={cn(
                            "relative flex items-center p-4 rounded-xl border-2 text-left transition-all hover:border-black/20",
                            selectedTemplate === template.id
                                ? "border-black bg-black/5"
                                : "border-transparent bg-white shadow-sm"
                        )}
                    >
                        <div className="flex-1">
                            <div className="font-semibold">{template.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {template.description}
                            </div>
                        </div>
                        {selectedTemplate === template.id && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-1">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
