import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { DEMO_STUDENTS } from "@/data/demoPlaybook";
import { initials } from "@/lib/utils";
import { isDemoMode } from "@/config/runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck, UserPlus } from "lucide-react";

export default function Students() {
  const [query, setQuery] = useState("");
  const students = useMemo(() => (
    isDemoMode
      ? DEMO_STUDENTS.filter((student) => `${student.name} ${student.student_id} ${student.grade} ${student.class_group}`.toLowerCase().includes(query.toLowerCase()))
      : []
  ), [query]);

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-3xl border bg-card/90 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge className="mb-3" variant="secondary">{isDemoMode ? "Synthetic roster" : "Roster"}</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Students</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {isDemoMode
                  ? "This roster is safe for screen shares. Every sample card ID can be typed manually or triggered from the dashboard buttons."
                  : "Live mode is ready for your real roster connection. Until then, manual ID entry on the dashboard can still sign students out and back in."}
              </p>
            </div>
            {isDemoMode && (
              <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search roster…" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
            )}
          </div>
        </section>

        {isDemoMode ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Card key={student.id} className="border-0 bg-white/90 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-slate-950/90">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 font-bold text-primary">{initials(student.name)}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">{student.name}</h3>
                      <p className="font-mono text-xs text-muted-foreground">{student.student_id}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary">{student.grade}</Badge>
                        <Badge variant="outline">{student.class_group}</Badge>
                        <Badge variant="outline">{student.dismissal}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed bg-card/80 shadow-lg">
            <CardContent className="p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <UserPlus className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Connect your roster source</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Live mode intentionally does not load sample students. Connect a real roster source when ready, or use dashboard manual ID entry for simple sign-out/sign-in tracking.
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-accent" /> Privacy by design</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
            <p><strong className="text-foreground">Mode-separated data:</strong> sample names only appear when you run the demo command.</p>
            <p><strong className="text-foreground">Predictable demo cards:</strong> demo mode supports STU-1001 through STU-1012 for manual scans.</p>
            <p><strong className="text-foreground">Live focus:</strong> live mode stays focused on real bathroom sign-out/sign-in activity.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
