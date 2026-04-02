import { DashboardHeader } from "../../components/DashboardHeader";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

const skillCategories = [
  { name: "Frontend", value: 85, fill: "var(--color-chart-1)" },
  { name: "Backend", value: 45, fill: "var(--color-chart-2)" },
  { name: "DevOps", value: 30, fill: "var(--color-chart-3)" },
  { name: "Soft Skills", value: 90, fill: "var(--color-chart-4)" },
  { name: "Tools", value: 75, fill: "var(--color-chart-5)" },
];

const skillBreakdown = [
  { skill: "JavaScript", cv: 90, job: 85 },
  { skill: "React", cv: 85, job: 90 },
  { skill: "TypeScript", cv: 80, job: 85 },
  { skill: "Node.js", cv: 30, job: 80 },
  { skill: "AWS", cv: 20, job: 75 },
  { skill: "Docker", cv: 25, job: 70 },
];

const progressHistory = [
  { date: "Jan", score: 62 },
  { date: "Feb", score: 68 },
  { date: "Mar", score: 72 },
  { date: "Apr", score: 71 },
  { date: "May", score: 78 },
  { date: "Jun", score: 78 },
];

const matchBreakdown = [
  { name: "Technical Skills", value: 65, color: "var(--color-primary)" },
  { name: "Soft Skills", value: 90, color: "var(--color-success)" },
  { name: "Experience", value: 75, color: "var(--color-chart-2)" },
  { name: "Education", value: 85, color: "var(--color-chart-4)" },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Insights & Analytics"
        description="Deep dive into your CV performance and skill distribution"
      />

      <div className="p-6">
        {/* Overview Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Overall Match", value: "78%", change: "+6%", trend: "up", icon: Target },
            { label: "Technical Score", value: "65%", change: "+3%", trend: "up", icon: BarChart3 },
            { label: "Soft Skills", value: "90%", change: "0%", trend: "neutral", icon: Award },
            { label: "Analyses Done", value: "12", change: "+2", trend: "up", icon: Calendar },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === "up" && "text-success",
                    stat.trend === "down" && "text-destructive",
                    stat.trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" && <ArrowUp className="h-3 w-3" />}
                  {stat.trend === "down" && <ArrowDown className="h-3 w-3" />}
                  {stat.trend === "neutral" && <Minus className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skill Category Distribution */}
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Skill Category Match</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillCategories} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--color-muted-foreground)" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="var(--color-muted-foreground)"
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-foreground)",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {skillCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Match Breakdown Pie Chart */}
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Match Breakdown</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={matchBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {matchBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {matchBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Comparison Chart */}
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">CV vs Job Requirements</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillBreakdown} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="skill" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-foreground)",
                    }}
                  />
                  <Bar dataKey="cv" name="Your CV" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="job" name="Job Requirement" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary" />
                <span className="text-muted-foreground">Your CV</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-muted" />
                <span className="text-muted-foreground">Job Requirement</span>
              </div>
            </div>
          </div>

          {/* Progress Over Time */}
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Improvement Progress</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
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
              Your match score has improved by <span className="font-medium text-success">+16%</span> over the past 6 months
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Priority Recommendations</h2>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                priority: "High",
                title: "Learn Node.js",
                description: "Backend skills are critical for this role. Consider taking a Node.js course.",
                impact: "+15%",
              },
              {
                priority: "Medium",
                title: "Get AWS Certified",
                description: "Cloud certifications significantly boost your profile for this position.",
                impact: "+10%",
              },
              {
                priority: "Low",
                title: "Add Docker Projects",
                description: "Containerization experience would strengthen your DevOps skills.",
                impact: "+5%",
              },
            ].map((rec, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-secondary/30 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      rec.priority === "High" && "bg-destructive/10 text-destructive",
                      rec.priority === "Medium" && "bg-warning/10 text-warning",
                      rec.priority === "Low" && "bg-success/10 text-success"
                    )}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-sm font-medium text-success">{rec.impact}</span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
