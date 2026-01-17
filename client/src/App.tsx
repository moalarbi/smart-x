import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Calls from "./pages/Calls";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import { useAuthState } from "./hooks/useAuthState";

function ProtectedRoute({ component: Component, isAuthenticated }: { component: any; isAuthenticated: boolean }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <Component />;
}

function Router({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />}
      </Route>
      <Route path="/calls">
        {() => <ProtectedRoute component={Calls} isAuthenticated={isAuthenticated} />}
      </Route>
      <Route path="/messages">
        {() => <ProtectedRoute component={Messages} isAuthenticated={isAuthenticated} />}
      </Route>
      <Route path="/reports">
        {() => <ProtectedRoute component={Reports} isAuthenticated={isAuthenticated} />}
      </Route>
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { user, loading } = useAuthState();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router isAuthenticated={!!user} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
