import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DoorOpen } from "lucide-react";
import ActiveSessionCard from "./ActiveSessionCard";
import { AnimatePresence } from "framer-motion";

export default function ActiveSessionsList({ sessions }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <DoorOpen className="h-5 w-5 text-primary" />
            Currently Out
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {sessions.length} student{sessions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {sessions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <DoorOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No students currently out</p>
          </div>
        ) : (
          <AnimatePresence>
            {sessions.map((session, i) => (
              <ActiveSessionCard key={session.id} session={session} index={i} />
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}