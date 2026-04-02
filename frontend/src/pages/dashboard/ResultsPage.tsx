import { DashboardHeader } from "../../components/DashboardHeader";
import { ScoreCircle } from "../../components/ScoreCircle";
import { SkillTag } from "../../components/SkillTag";
import { SuggestionCard } from "../../components/SuggestionCard";
import { Button } from "../../components/ui/button";
import {
  Download,
  Share2,
  RefreshCw,
  TrendingUp,
  FileText,
  Target,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const matchedSkills = [
  "JavaScript",
  "React",
  "TypeScript",
  "Git",
  "REST APIs",
  "Problem Solving",
  "Team Collaboration",
];

const missingSkills = [
  "Node.js",
  "AWS",
  "Docker",
  "CI/CD",
  "PostgreSQL",
];

const suggestions = [
  {
    type: "improvement" as const,
    title: "Add Cloud Experience",
    description: "The job requires AWS experience. Consider adding relevant cloud projects or certifications to strengthen your application.",
    action: "View AWS Certifications",
  },
  {
    type: "improvement" as const,
    title: "Highlight Backend Skills",
    description: "Emphasize any Node.js or backend development experience you have. Even personal projects count.",
    action: "Learn More",
  },
  {
    type: "warning" as const,
    title: "Missing DevOps Keywords",
    description: "Docker and CI/CD are mentioned in the job description but not in your CV. Add relevant experience if you have it.",
  },
  {
    type: "positive" as const,
    title: "Strong Frontend Skills",
    description: "Your React and TypeScript experience matches well with the requirements. These are your strongest points.",
  },
];

const keywordAnalysis = {
  cv: ["JavaScript", "React", "TypeScript", "CSS", "HTML", "Git", "Agile", "REST APIs", "Problem Solving", "Communication"],
  job: ["JavaScript", "React", "TypeScript", "Node.js", "AWS", "Docker", "CI/CD", "PostgreSQL", "REST APIs", "Team Collaboration"],
};

export default function ResultsPage() {
  const score = 78;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Analysis Results"
        description="Senior Software Engineer Position"
      />

      <div className="p-6">
        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Link to="/dashboard/analyze">
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
              <RefreshCw className="h-4 w-4" />
              New Analysis
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Score Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Match Score</h2>
              <ScoreCircle score={score} size="lg" />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-success/10 p-3">
                  <p className="text-2xl font-bold text-success">{matchedSkills.length}</p>
                  <p className="text-xs text-muted-foreground">Matched Skills</p>
                </div>
                <div className="rounded-xl bg-destructive/10 p-3">
                  <p className="text-2xl font-bold text-destructive">{missingSkills.length}</p>
                  <p className="text-xs text-muted-foreground">Missing Skills</p>
                </div>
              </div>
              <Link to="/dashboard/insights" className="mt-6 block">
                <Button variant="outline" className="w-full gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Detailed Insights
                </Button>
              </Link>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Skills Analysis</h2>
              </div>

              {/* Strengths */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <h3 className="font-medium text-foreground">Matching Skills</h3>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                    {matchedSkills.length} found
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} type="matched" />
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <h3 className="font-medium text-foreground">Missing Skills</h3>
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                    {missingSkills.length} missing
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} type="missing" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">AI Suggestions</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} {...suggestion} />
              ))}
            </div>
          </div>
        </div>

        {/* Keyword Comparison */}
        <div className="mt-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Keyword Comparison</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* CV Keywords */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <h3 className="font-medium text-foreground">Your CV Keywords</h3>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex flex-wrap gap-2">
                    {keywordAnalysis.cv.map((keyword) => {
                      const isMatched = keywordAnalysis.job.includes(keyword);
                      return (
                        <span
                          key={keyword}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            isMatched
                              ? "bg-success/20 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {keyword}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Job Keywords */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  <h3 className="font-medium text-foreground">Job Description Keywords</h3>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex flex-wrap gap-2">
                    {keywordAnalysis.job.map((keyword) => {
                      const isMatched = keywordAnalysis.cv.includes(keyword);
                      return (
                        <span
                          key={keyword}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            isMatched
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {keyword}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success/50" />
                <span>Matched keywords</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/50" />
                <span>Missing from CV</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <span>Extra in CV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
