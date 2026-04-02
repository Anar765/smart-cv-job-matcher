import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  onMenuClick?: () => void;
}

export function DashboardHeader({ title, description, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 bg-secondary/50 pl-9"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90" asChild>
          <Link to="/dashboard/analyze">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Analysis</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
