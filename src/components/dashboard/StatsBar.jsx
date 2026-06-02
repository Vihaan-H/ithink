import { Card } from "@/components/ui/card";
import { Users, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function StatsBar({ activeSessions, completedToday, avgDuration, longSessions }) {
  const stats = [
    {
      label: "Currently Out",
      value: activeSessions,
      icon: Users,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Completed Today",
      value: completedToday,
      icon: CheckCircle2,
      color: "text-accent bg-accent/10",
    },
    {
      label: "Avg Duration",
      value: avgDuration ? `${avgDuration}m` : "—",
      icon: Clock,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Long Breaks (10m+)",
      value: longSessions,
      icon: AlertTriangle,
      color: "text-destructive bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 border-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}