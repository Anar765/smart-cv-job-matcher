import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export function ScoreCircle({ score, size = "lg", className, animated = true }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  const sizeConfig = {
    sm: { size: 80, stroke: 6, textSize: "text-lg" },
    md: { size: 120, stroke: 8, textSize: "text-2xl" },
    lg: { size: 200, stroke: 12, textSize: "text-5xl" },
  };

  const config = sizeConfig[size];
  const radius = (config.size - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;
  const dashOffset = circumference - progress;

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, animated]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "stroke-success";
    if (score >= 60) return "stroke-primary";
    if (score >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={config.size}
        height={config.size}
        className="-rotate-90 transform"
      >
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-muted/30"
        />
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn("transition-all duration-500", getStrokeColor(displayScore))}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn("font-bold", config.textSize, getScoreColor(displayScore))}>
          {displayScore}%
        </span>
        {size === "lg" && (
          <span className="text-sm text-muted-foreground">Match Score</span>
        )}
      </div>
    </div>
  );
}
