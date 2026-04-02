import { Outlet } from "react-router-dom";
import { useState } from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { cn } from "../lib/utils";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "ml-18" : "ml-64"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
