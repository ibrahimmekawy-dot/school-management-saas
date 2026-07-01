import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import Sidebar from "@/components/layouts/Sidebar";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import TopNav from "@/components/layouts/TopNav";

// Pages
import SuperAdminDashboard from "@/pages/admin/Dashboard";
import SchoolsManagement from "@/pages/admin/SchoolsManagement";
import SchoolDetails from "@/pages/admin/SchoolDetails";
import AdminsManagement from "@/pages/admin/AdminsManagement";
import SystemSettings from "@/pages/admin/SystemSettings";

import SchoolAdminDashboard from "@/pages/school/Dashboard";
import StaffManagement from "@/pages/school/StaffManagement";
import TeachersManagement from "@/pages/school/TeachersManagement";
import UsersManagement from "@/pages/school/UsersManagement";
import DataImport from "@/pages/school/DataImport";
import ActivityLog from "@/pages/school/ActivityLog";

interface DashboardLayoutProps {
  params?: Record<string, string>;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isAdminPath = location.startsWith("/admin");
  const isSchoolPath = location.startsWith("/school");

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
      <Sidebar isOpen={sidebarOpen} isAdmin={isAdminPath} />

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
            
            {/* Routes - Using relative paths */}
            <Switch>
              {/* Super Admin Routes */}
              <Route path="/admin" component={SuperAdminDashboard} />
              <Route path="/admin/schools" component={SchoolsManagement} />
              <Route path="/admin/schools/:id" component={SchoolDetails} />
              <Route path="/admin/admins" component={AdminsManagement} />
              <Route path="/admin/settings" component={SystemSettings} />

              {/* School Admin Routes */}
              <Route path="/school" component={SchoolAdminDashboard} />
              <Route path="/school/staff" component={StaffManagement} />
              <Route path="/school/teachers" component={TeachersManagement} />
              <Route path="/school/users" component={UsersManagement} />
              <Route path="/school/import" component={DataImport} />
              <Route path="/school/activity" component={ActivityLog} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
