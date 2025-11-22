import { ResumePresentation } from "@/types/resume";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ThemeControlsProps {
    presentation: ResumePresentation;
    onChange: (updates: Partial<ResumePresentation>) => void;
}

const palettes = [
    { name: "Noir", primary: "#000000", accent: "#333333" },
    { name: "Slate", primary: "#1e293b", accent: "#475569" },
    { name: "Charcoal", primary: "#18181b", accent: "#27272a" },
];

export function ThemeControls({ presentation, onChange }: ThemeControlsProps) {
    return (
        <div className="space-y-8">
            {/* Color Palette */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Color Theme
                </h3>
                <div className="flex gap-3">
                    {palettes.map((palette) => (
                        <button
                            key={palette.name}
                            onClick={() =>
                                onChange({
                                    primaryColor: palette.primary,
                                    accentColor: palette.accent,
                                })
                            }
                            className={cn(
                                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                                presentation.primaryColor === palette.primary
                                    ? "border-black scale-110"
                                    : "border-transparent hover:scale-105"
                            )}
                            style={{ backgroundColor: palette.primary }}
                            aria-label={palette.name}
                        />
                    ))}
                </div>
            </div>

            {/* Typography Scale */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Typography
                </h3>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {(["sm", "md", "lg"] as const).map((size) => (
                        <button
                            key={size}
                            onClick={() => onChange({ fontScale: size })}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                presentation.fontScale === size
                                    ? "bg-white shadow-sm text-black"
                                    : "text-muted-foreground hover:text-black"
                            )}
                        >
                            {size.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Density */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Density
                </h3>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {(["comfortable", "cozy", "compact"] as const).map((d) => (
                        <button
                            key={d}
                            onClick={() => onChange({ density: d })}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-md transition-all capitalize",
                                presentation.density === d
                                    ? "bg-white shadow-sm text-black"
                                    : "text-muted-foreground hover:text-black"
                            )}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Profile Photo */}
            <div className="flex items-center justify-between">
                <Label htmlFor="photo-toggle" className="font-medium">
                    Show Profile Photo
                </Label>
                <Switch
                    id="photo-toggle"
                    checked={presentation.showProfilePhoto}
                    onCheckedChange={(checked) => onChange({ showProfilePhoto: checked })}
                />
            </div>
        </div>
    );
}
