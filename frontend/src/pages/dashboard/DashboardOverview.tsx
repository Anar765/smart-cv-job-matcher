import { DashboardHeader } from "../../components/DashboardHeader";
import { ScoreCircle } from "../../components/ScoreCircle";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  FileSearch,
  BarChart3,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Target,
  Calendar,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const recentAnalyses = [
  { id: 1, title: "Senior Software Engineer", company: "Tech Corp", score: 78, date: "2 days ago" },
  { id: 2, title: "Full Stack Developer", company: "StartupXYZ", score: 85, date: "4 days ago" },
  { id: 3, title: "Frontend Engineer", company: "Design Studios", score: 92, date: "1 week ago" },
];

const progressData = [
  { date: "Jan", score: 62 },
  { date: "Feb", score: 68 },
  { date: "Mar", score: 72 },
  { date: "Apr", score: 71 },
  { date: "May", score: 78 },
  { date: "Jun", score: 78 },
];

const quickActions = [
  {
    title: "Analyze New CV",
    description: "Upload and compare against a job",
    icon: FileSearch,
    href: "/dashboard/analyze",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "View Insights",
    description: "Deep dive into your analytics",
    icon: BarChart3,
    href: "/dashboard/insights",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Browse History",
    description: "Review past analyses",
    icon: Clock,
    href: "/dashboard/history",
    color: "bg-success/10 text-success",
  },
];

export default function DashboardOverview() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your CV performance."
      />

      <div className="p-6">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Overall Match", value: "78%", change: "+6%", trend: "up", icon: Target },
            { label: "Analyses Done", value: "12", change: "+2", trend: "up", icon: Calendar },
            { label: "Avg Score", value: "72%", change: "+8%", trend: "up", icon: TrendingUp },
            { label: "Best Match", value: "92%", change: "", trend: "neutral", icon: Award },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.change && (
                  <span className="text-sm font-medium text-success">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    to={action.href}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-primary/30 hover:bg-secondary/50"
                  >
                    <div className={cn("rounded-lg p-2", action.color)}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Score Progress</h2>
                <Link to="/dashboard/insights">
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                        color: "var(--color-foreground)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-primary)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Your score has improved by <span className="font-medium text-success">+16%</span> over the past 6 months
              </p>
            </div>
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="mt-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Analyses</h2>
              <Link to="/dashboard/history">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  to="/dashboard/results"
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-primary/30 hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <ScoreCircle score={analysis.score} size="sm" animated={false} />
                    <div>
                      <p className="font-medium text-foreground">{analysis.title}</p>
                      <p className="text-sm text-muted-foreground">{analysis.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-bold",
                      analysis.score >= 80 ? "text-success" : analysis.score >= 50 ? "text-primary" : "text-destructive"
                    )}>
                      {analysis.score}%
                    </p>
                    <p className="text-sm text-muted-foreground">{analysis.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-6 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Ready to optimize your next application?
          </h3>
          <p className="mb-4 text-muted-foreground">
            Upload your CV and compare it against any job description for instant AI-powered insights.
          </p>
          <Link to="/dashboard/analyze">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              Start New Analysis
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
