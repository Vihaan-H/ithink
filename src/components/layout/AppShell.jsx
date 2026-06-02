import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/AuthContext";
import { appCopy } from "@/config/runtime";
import { ClipboardCheck, LayoutDashboard, Users, GraduationCap } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/students", label: "Students", Icon: Users },
  { to: "/my-class", label: "Settings", Icon: GraduationCap },
];

export default function AppShell({ children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_32rem),linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.45))]">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-500 text-primary-foreground shadow-lg shadow-primary/25">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight">{appCopy.name}</h1>
                <Badge variant="secondary" className="hidden sm:inline-flex">{appCopy.modeLabel}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{appCopy.tagline}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 rounded-full border bg-card/70 p-1 shadow-sm md:flex">
            {navItems.map(({ to, label, Icon }) => (
              <Button key={to} asChild variant="ghost" size="sm" className="rounded-full">
                <NavLink to={to} className={({ isActive }) => isActive ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground"}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </NavLink>
              </Button>
            ))}
          </nav>
          <div className="hidden rounded-2xl border bg-card/70 px-3 py-2 text-right shadow-sm sm:block">
            <p className="text-sm font-semibold">{user.full_name}</p>
            <p className="text-xs text-muted-foreground">{user.class_name}</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
          {navItems.map(({ to, label, Icon }) => (
            <Button key={to} asChild variant="ghost" size="sm" className="shrink-0 rounded-full">
              <NavLink to={to} className={({ isActive }) => isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </NavLink>
            </Button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
