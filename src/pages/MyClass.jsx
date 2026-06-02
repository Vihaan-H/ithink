import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isDemoMode } from "@/config/runtime";
import { Clock, FileText, PlugZap, Presentation, Settings, Siren } from "lucide-react";

const policies = [
  { title: "Target pass length", value: "5 minutes", detail: "Normal bathroom visits stay green and move quietly into history." },
  { title: "Attention threshold", value: "10 minutes", detail: "Active and completed passes beyond this threshold are counted as long breaks." },
  { title: "Reader mode", value: "Command-based", detail: "Run demo mode for virtual reader tools; run live mode for a clean operational workspace." },
  { title: "Roster source", value: "Mode aware", detail: "Demo mode uses sample students; live mode waits for your real roster connection." },
];

const demoChecklist = [
  "Run npm run demo and open the dashboard.",
  "Click Connect virtual reader to show the no-hardware reader flow.",
  "Click Avery Johnson once to create a live bathroom sign-out and explain the timer.",
  "Click Jump timers +5m twice to trigger the long-pass alert state.",
  "Click Avery Johnson again to complete the pass and show the audit row.",
  "Run an unknown-card Demo Lab scenario to show safe error handling.",
];

const liveChecklist = [
  "Run npm run dev and open the dashboard.",
  "Use manual ID entry to sign a student out.",
  "Type the same ID again when the student returns.",
  "Review Currently Out, Recent History, and the metric cards.",
  "Connect a real roster or reader integration when ready.",
];

export default function MyClass() {
  const checklist = isDemoMode ? demoChecklist : liveChecklist;

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-primary p-6 text-white shadow-2xl">
          <Badge className="mb-4 bg-white/10 text-white">Room 204 configuration</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Bathroom Pass Settings</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Tune the behavior that matters for bathroom sign-out/sign-in: thresholds, reader mode, privacy messaging, and the command you use to launch the workspace.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {policies.map((policy) => (
            <Card key={policy.title} className="border-0 bg-white/90 shadow-lg dark:bg-slate-950/90">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{policy.title}</p>
                <p className="mt-2 text-2xl font-bold">{policy.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{policy.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Presentation className="h-5 w-5 text-primary" /> {isDemoMode ? "No-hardware demo checklist" : "Live mode checklist"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-xl border bg-secondary/30 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</div>
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Upgrade notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3"><PlugZap className="h-5 w-5 text-accent" /><p>Scanner callbacks are centralized, so real hardware can call the same student ID function as manual entry.</p></div>
              <div className="flex gap-3"><Clock className="h-5 w-5 text-amber-500" /><p>Live timers and threshold metrics make bathroom pass supervision visible during class.</p></div>
              <div className="flex gap-3"><Siren className="h-5 w-5 text-destructive" /><p>Demo unknown IDs fail closed; live mode can still sign out by raw student ID until a roster is connected.</p></div>
              <div className="flex gap-3"><FileText className="h-5 w-5 text-primary" /><p>Use the README for the exact live and demo commands plus walkthrough steps.</p></div>
              <Button className="w-full" asChild><a href="/">Go to dashboard</a></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
