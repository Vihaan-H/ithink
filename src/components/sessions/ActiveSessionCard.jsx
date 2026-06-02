import { Card } from "@/components/ui/card";
import { User, Clock } from "lucide-react";
import LiveTimer from "./LiveTimer";
import { motion } from "framer-motion";

export default function ActiveSessionCard({ session, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{session.student_name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{session.student_id}</span>
                {session.grade && (
                  <>
                    <span>·</span>
                    <span>{session.grade}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <LiveTimer startTime={session.check_in_time} className="text-lg" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Clock className="h-3 w-3" />
              <span>{new Date(session.check_in_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}