import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { format } from "date-fns";

export default function SessionHistoryTable({ sessions }) {
  const completedSessions = sessions
    .filter((s) => s.status === "completed")
    .sort((a, b) => new Date(b.check_out_time) - new Date(a.check_out_time))
    .slice(0, 20);

  const getDurationBadge = (minutes) => {
    if (!minutes && minutes !== 0) return null;
    const rounded = Math.round(minutes * 10) / 10;
    if (rounded >= 10) return <Badge variant="destructive" className="font-mono">{rounded} min</Badge>;
    if (rounded >= 5) return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-mono">{rounded} min</Badge>;
    return <Badge variant="secondary" className="font-mono">{rounded} min</Badge>;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Recent History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {completedSessions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No completed sessions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{session.student_name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{session.student_id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(session.check_in_time), "h:mm a")}
                    </TableCell>
                    <TableCell className="text-sm">
                      {session.check_out_time ? format(new Date(session.check_out_time), "h:mm a") : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      {getDurationBadge(session.duration_minutes)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}