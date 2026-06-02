import { useMemo, useState } from "react";
import { addMinutes, differenceInSeconds, subMinutes } from "date-fns";
import AppShell from "@/components/layout/AppShell";
import ScannerPanel from "@/components/scanner/ScannerPanel";
import StatsBar from "@/components/dashboard/StatsBar";
import ActiveSessionsList from "@/components/sessions/ActiveSessionsList";
import SessionHistoryTable from "@/components/sessions/SessionHistoryTable";
import DemoLab from "@/components/demo/DemoLab";
import { DEMO_STUDENTS } from "@/data/demoPlaybook";
import { appCopy, isDemoMode } from "@/config/runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ClipboardCheck, FastForward, RotateCcw, Users } from "lucide-react";

const buildInitialSessions = () => {
  if (!isDemoMode) return [];
  const now = new Date();
  return [
    {
      id: "seed-active-1",
      student_id: "STU-1003",
      student_name: "Noah Patel",
      grade: "6th",
      check_in_time: subMinutes(now, 4).toISOString(),
      status: "active",
    },
    {
      id: "seed-active-2",
      student_id: "STU-1007",
      student_name: "Ethan Davis",
      grade: "8th",
      check_in_time: subMinutes(now, 12).toISOString(),
      status: "active",
    },
    {
      id: "seed-complete-1",
      student_id: "STU-1001",
      student_name: "Avery Johnson",
      grade: "5th",
      check_in_time: subMinutes(now, 28).toISOString(),
      check_out_time: subMinutes(now, 23).toISOString(),
      duration_minutes: 5,
      status: "completed",
    },
    {
      id: "seed-complete-2",
      student_id: "STU-1005",
      student_name: "Liam Brooks",
      grade: "7th",
      check_in_time: subMinutes(now, 52).toISOString(),
      check_out_time: subMinutes(now, 41).toISOString(),
      duration_minutes: 11,
      status: "completed",
    },
  ];
};

function studentById(studentId) {
  if (!isDemoMode) return null;
  return DEMO_STUDENTS.find((student) => student.student_id.toLowerCase() === studentId.toLowerCase());
}

function calculateDurationMinutes(start, end = new Date()) {
  return Math.max(0, Math.round((differenceInSeconds(end, new Date(start)) / 60) * 10) / 10);
}

export default function Dashboard() {
  const [bluetoothStatus, setBluetoothStatus] = useState("disconnected");
  const [deviceName, setDeviceName] = useState("");
  const [scannerError, setScannerError] = useState("");
  const [sessions, setSessions] = useState(buildInitialSessions);
  const [lastScanResult, setLastScanResult] = useState(null);

  const activeSessions = sessions.filter((session) => session.status === "active");
  const completedSessions = sessions.filter((session) => session.status === "completed");

  const stats = useMemo(() => {
    const completedToday = completedSessions.length;
    const avgDuration = completedToday
      ? Math.round(completedSessions.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) / completedToday)
      : 0;
    const longSessions = [
      ...completedSessions.filter((session) => (session.duration_minutes || 0) >= 10),
      ...activeSessions.filter((session) => calculateDurationMinutes(session.check_in_time) >= 10),
    ].length;
    return { completedToday, avgDuration, longSessions };
  }, [activeSessions, completedSessions]);

  const connectReader = () => {
    if (!isDemoMode) {
      setScannerError("Reader pairing is available in demo mode. Use manual ID entry for live sign-out/sign-in until hardware is configured.");
      return;
    }
    setScannerError("");
    setBluetoothStatus("connecting");
    window.setTimeout(() => {
      setBluetoothStatus("connected");
      setDeviceName("Virtual Bathroom Pass Reader");
      setLastScanResult({ type: "check_in", message: "Virtual reader connected. You can present without hardware." });
    }, 650);
  };

  const disconnectReader = () => {
    setBluetoothStatus("disconnected");
    setDeviceName("");
    setScannerError("");
  };

  const scanStudent = (studentId) => {
    const normalizedId = studentId.trim().toUpperCase();
    const matchedStudent = studentById(normalizedId);
    if (!matchedStudent && isDemoMode) {
      setLastScanResult({ type: "error", message: `Unknown card ${normalizedId}. Try STU-1001 through STU-1012.` });
      setScannerError("Unknown demo card. Use the demo roster or type STU-1001.");
      return;
    }
    const student = matchedStudent || {
      student_id: normalizedId,
      name: `Student ${normalizedId}`,
      grade: "",
    };

    setScannerError("");
    const existing = sessions.find((session) => session.student_id === student.student_id && session.status === "active");
    const now = new Date();

    if (existing) {
      const duration = calculateDurationMinutes(existing.check_in_time, now);
      setSessions((current) => current.map((session) => session.id === existing.id
        ? { ...session, check_out_time: now.toISOString(), duration_minutes: duration, status: "completed" }
        : session));
      setLastScanResult({ type: "check_out", message: `${student.name} checked in after ${duration} minutes.` });
      return;
    }

    const newSession = {
      id: `session-${Date.now()}`,
      student_id: student.student_id,
      student_name: student.name,
      grade: student.grade,
      check_in_time: now.toISOString(),
      status: "active",
    };
    setSessions((current) => [newSession, ...current]);
    setLastScanResult({ type: "check_in", message: `${student.name} checked out at ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.` });
  };

  const runScenario = (scenario) => {
    if (scenario.category === "unknown-card") {
      scanStudent(`UNKNOWN-${scenario.id.slice(-2)}`);
      return;
    }
    const now = new Date();
    const opened = addMinutes(now, -scenario.expected_minutes);
    const demoSession = {
      id: `scenario-${scenario.id}-${Date.now()}`,
      student_id: scenario.student_id,
      student_name: scenario.student_name,
      grade: scenario.grade,
      check_in_time: opened.toISOString(),
      status: "active",
      scenario: scenario.title,
    };
    setSessions((current) => [demoSession, ...current.filter((session) => !(session.student_id === scenario.student_id && session.status === "active"))]);
    setBluetoothStatus("connected");
    setDeviceName("Virtual Bathroom Pass Reader");
    setLastScanResult({ type: "check_in", message: `${scenario.title}: ${scenario.student_name} is now active with a ${scenario.expected_minutes}m simulated timer.` });
  };

  const jumpActiveTimers = () => {
    setSessions((current) => current.map((session) => session.status === "active"
      ? { ...session, check_in_time: subMinutes(new Date(session.check_in_time), 5).toISOString() }
      : session));
    setLastScanResult({ type: "check_in", message: "Advanced every active timer by 5 minutes for demo pacing." });
  };

  const resetDemo = () => {
    setSessions(buildInitialSessions());
    setLastScanResult(null);
    setScannerError("");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-br from-primary via-indigo-600 to-slate-950 p-6 text-primary-foreground shadow-2xl shadow-primary/20 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20">Operational command center</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{appCopy.name}: sign students out and back in with confidence.</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/75">
              {isDemoMode
                ? "Demo mode adds a virtual reader, sample cards, synthetic scenarios, and a presentation workflow for days when no badge hardware is available."
                : "Live mode keeps the screen focused on bathroom sign-out/sign-in, active timers, and the recent audit trail."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {isDemoMode && (
              <>
                <Button variant="secondary" className="gap-2" onClick={jumpActiveTimers}><FastForward className="h-4 w-4" /> Jump timers +5m</Button>
                <Button variant="outline" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={resetDemo}><RotateCcw className="h-4 w-4" /> Reset demo</Button>
              </>
            )}
          </div>
        </section>

        <StatsBar activeSessions={activeSessions.length} completedToday={stats.completedToday} avgDuration={stats.avgDuration} longSessions={stats.longSessions} />

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <ScannerPanel
              bluetoothStatus={bluetoothStatus}
              deviceName={deviceName}
              error={scannerError}
              onConnect={connectReader}
              onDisconnect={disconnectReader}
              onSimulateScan={scanStudent}
              lastScanResult={lastScanResult}
              demoMode={isDemoMode}
            />
            {isDemoMode && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg"><Users className="h-5 w-5 text-primary" /> Demo cards</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {DEMO_STUDENTS.slice(0, 8).map((student) => (
                  <Button key={student.id} variant="outline" className="h-auto justify-start py-3 text-left" onClick={() => scanStudent(student.student_id)}>
                    <span>
                      <span className="block text-sm font-semibold">{student.name}</span>
                      <span className="block font-mono text-xs text-muted-foreground">{student.student_id}</span>
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>
            )}
          </div>
          <div className="space-y-6">
            {stats.longSessions > 0 && (
              <Card className="border-amber-500/30 bg-amber-500/10 shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <p className="text-sm"><strong>{stats.longSessions} pass alert{stats.longSessions === 1 ? "" : "s"}:</strong> Review active or completed sessions over 10 minutes.</p>
                </CardContent>
              </Card>
            )}
            <ActiveSessionsList sessions={activeSessions} />
            <SessionHistoryTable sessions={sessions} />
          </div>
        </div>

        {isDemoMode && <DemoLab onRunScenario={runScenario} />}

        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10"><ClipboardCheck className="h-5 w-5 text-accent" /></div>
              <div>
                <p className="font-semibold">{isDemoMode ? "Demo tip" : "Live tip"}</p>
                <p className="text-sm text-muted-foreground">{isDemoMode ? "Use the demo cards for fast narration, manual IDs for edge cases, and Demo Lab when you need a guided no-hardware story." : "Use manual ID entry to sign students out and back in until a physical reader is configured."}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
