import { cn } from "../lib/utils";
import { Check, X } from "lucide-react";

interface SkillTagProps {
  skill: string;
  type: "matched" | "missing" | "neutral";
  className?: string;
}

export function SkillTag({ skill, type, className }: SkillTagProps) {
  const variants = {
    matched: "bg-success/10 text-success border-success/20",
    missing: "bg-destructive/10 text-destructive border-destructive/20",
    neutral: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-transform hover:scale-105",
        variants[type],
        className
      )}
    >
      {type === "matched" && <Check className="h-3.5 w-3.5" />}
      {type === "missing" && <X className="h-3.5 w-3.5" />}
      {skill}
    </span>
  );
}
