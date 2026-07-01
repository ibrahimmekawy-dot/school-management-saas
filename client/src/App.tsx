import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/"}>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin/*"}>
        <ProtectedRoute requiredRole={["admin", "coordinator"]}>
          <DashboardLayout />
        </ProtectedRoute>
      </Route>
      <Route path={"/school/*"}>
        <ProtectedRoute requiredRole={["admin", "coordinator", "teacher"]}>
          <DashboardLayout />
        </ProtectedRoute>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Check for saved direction preference or system language
    const saved = localStorage.getItem('direction') as 'ltr' | 'rtl' | null;
    const direction = saved || 'rtl';
    setDir(direction);
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <AuthProvider>
          <TooltipProvider>
            <div dir={dir}>
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
