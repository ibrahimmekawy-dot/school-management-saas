import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  FileUp,
  Activity,
  UserCheck,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  isAdmin: boolean;
}

export default function Sidebar({ isOpen, isAdmin }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const adminMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Schools", icon: Building2, href: "/admin/schools" },
    { label: "Admins", icon: Users, href: "/admin/admins" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const schoolMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/school" },
    { label: "Staff", icon: UserCheck, href: "/school/staff" },
    { label: "Teachers", icon: BookOpen, href: "/school/teachers" },
    { label: "Users", icon: Users, href: "/school/users" },
    { label: "Import Data", icon: FileUp, href: "/school/import" },
    { label: "Activity Log", icon: Activity, href: "/school/activity" },
  ];

  const menuItems = isAdmin ? adminMenuItems : schoolMenuItems;

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-center">
        <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold text-lg">
          SM
        </div>
        {isOpen && <span className="ml-3 font-bold text-lg">SchoolMgmt</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center px-4 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors group">
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="ml-3 text-sm font-medium group-hover:text-sidebar-accent-foreground">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-2 text-sm">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
