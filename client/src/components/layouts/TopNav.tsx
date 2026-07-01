import { Menu, Moon, Sun, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface TopNavProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  onThemeToggle: () => void;
  onDirectionToggle: () => void;
  theme: string;
}

export default function TopNav({
  onMenuClick,
  sidebarOpen,
  onThemeToggle,
  onDirectionToggle,
  theme,
}: TopNavProps) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // الحصول على الأحرف الأولى من الاسم
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Left side - Menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="hover:bg-secondary"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="hover:bg-secondary"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Direction Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDirectionToggle}
          className="hover:bg-secondary"
          title="Toggle RTL/LTR"
        >
          <Globe className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary rounded-full"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {user ? getInitials(user.name) : "AD"}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "admin@school.edu"}</p>
              {user?.schoolName && (
                <p className="text-xs text-muted-foreground mt-1">{user.schoolName}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                الدور: {
                  user?.role === "admin" ? "مسؤول" :
                  user?.role === "coordinator" ? "منسق" :
                  user?.role === "teacher" ? "معلم" :
                  "مسؤول عام"
                }
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>الإعدادات</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
