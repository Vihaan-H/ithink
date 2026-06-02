import { useMemo, useState } from "react";
import { DEMO_SCENARIOS, DEMO_SCRIPT } from "@/data/demoPlaybook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlayCircle, Search, Sparkles, Wand2 } from "lucide-react";

export default function DemoLab({ onRunScenario }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => ["all", ...new Set(DEMO_SCENARIOS.map((scenario) => scenario.category))], []);
  const scenarios = useMemo(() => DEMO_SCENARIOS
    .filter((scenario) => category === "all" || scenario.category === category)
    .filter((scenario) => `${scenario.title} ${scenario.student_name} ${scenario.summary}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6), [category, query]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="h-5 w-5 text-primary" />
            Hardwareless Demo Lab
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Use these synthetic scenarios to demo the complete scan flow when you do not have Bluetooth, NFC, or badge hardware nearby.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search scenario, student, or outcome…" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <select className="rounded-md border bg-background px-3 py-2 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {scenarios.map((scenario) => (
              <article key={scenario.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold leading-tight">{scenario.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{scenario.student_name} · {scenario.student_id}</p>
                  </div>
                  <Badge variant={scenario.risk === "high" ? "destructive" : "secondary"}>{scenario.risk}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{scenario.summary}</p>
                <Button className="mt-4 w-full gap-2" size="sm" onClick={() => onRunScenario(scenario)}>
                  <PlayCircle className="h-4 w-4" />
                  Run scenario
                </Button>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            7-minute demo script
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {DEMO_SCRIPT.map((step, index) => (
            <div key={step.name} className="flex gap-3 rounded-xl bg-secondary/60 p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</div>
              <div>
                <p className="font-semibold text-sm">{step.name}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
