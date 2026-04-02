import { DashboardHeader } from "../../components/DashboardHeader";
import { ScoreCircle } from "../../components/ScoreCircle";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  Search,
  Filter,
  Calendar,
  FileText,
  Trash2,
  Building2,
  Clock,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const analysisHistory = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp Inc.",
    date: "2026-03-20",
    score: 78,
    status: "analyzed",
    skills: { matched: 7, missing: 5 },
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "StartupXYZ",
    date: "2026-03-18",
    score: 85,
    status: "analyzed",
    skills: { matched: 9, missing: 3 },
  },
  {
    id: 3,
    jobTitle: "Frontend Engineer",
    company: "Design Studios",
    date: "2026-03-15",
    score: 92,
    status: "analyzed",
    skills: { matched: 11, missing: 2 },
  },
  {
    id: 4,
    jobTitle: "React Developer",
    company: "WebAgency Pro",
    date: "2026-03-12",
    score: 88,
    status: "analyzed",
    skills: { matched: 10, missing: 3 },
  },
  {
    id: 5,
    jobTitle: "Backend Engineer",
    company: "DataFlow Systems",
    date: "2026-03-08",
    score: 52,
    status: "analyzed",
    skills: { matched: 4, missing: 8 },
  },
  {
    id: 6,
    jobTitle: "DevOps Engineer",
    company: "CloudNine Inc.",
    date: "2026-03-05",
    score: 35,
    status: "analyzed",
    skills: { matched: 3, missing: 10 },
  },
];

const stats = {
  totalAnalyses: 12,
  avgScore: 72,
  bestMatch: 92,
  thisMonth: 6,
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredHistory = analysisHistory.filter((item) => {
    const matchesSearch =
      item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "high" && item.score >= 80) ||
      (selectedFilter === "medium" && item.score >= 50 && item.score < 80) ||
      (selectedFilter === "low" && item.score < 50);

    return matchesSearch && matchesFilter;
  });

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 50) return "bg-primary/10";
    return "bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Analysis History"
        description="View and revisit your previous CV analyses"
      />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Analyses", value: stats.totalAnalyses, icon: FileText },
            { label: "Average Score", value: `${stats.avgScore}%`, icon: TrendingUp },
            { label: "Best Match", value: `${stats.bestMatch}%`, icon: TrendingUp },
            { label: "This Month", value: stats.thisMonth, icon: Calendar },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary/30 py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["all", "high", "medium", "low"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  selectedFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {filter === "all" ? "All" : filter === "high" ? "80%+" : filter === "medium" ? "50-79%" : "<50%"}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn("rounded-xl p-3", getScoreBg(item.score))}>
                      <ScoreCircle score={item.score} size="sm" animated={false} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{item.jobTitle}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {item.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="text-success">
                          {item.skills.matched} matched
                        </span>
                        <span className="text-destructive">
                          {item.skills.missing} missing
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Link to="/dashboard/results">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">No analyses found</h3>
              <p className="mb-6 text-muted-foreground">
                {searchQuery || selectedFilter !== "all"
                  ? "Try adjusting your filters or search query"
                  : "Start by analyzing your CV against a job description"}
              </p>
              <Link to="/dashboard/analyze">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <FileText className="h-4 w-4" />
                  New Analysis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
