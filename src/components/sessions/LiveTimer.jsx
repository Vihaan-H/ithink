import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LiveTimer({ startTime, className }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();

    const update = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const isLong = minutes >= 10;

  return (
    <span className={cn(
      "font-mono font-semibold tabular-nums",
      isLong ? "text-destructive" : minutes >= 5 ? "text-amber-500" : "text-foreground",
      className
    )}>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}