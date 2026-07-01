import { useState } from "react";
import { Menu, Moon, Sun, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import Sidebar from "@/components/layouts/Sidebar";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import TopNav from "@/components/layouts/TopNav";
import SuperAdminDashboard from "@/pages/admin/Dashboard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const toggleDirection = () => {
    const currentDir = document.documentElement.dir as 'ltr' | 'rtl';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem('direction', newDir);
    document.documentElement.dir = newDir;
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} isAdmin={true} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onThemeToggle={toggleTheme || (() => {})}
          onDirectionToggle={toggleDirection}
          theme={theme}
        />

        {/* Breadcrumbs & Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Breadcrumbs />
            <SuperAdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
