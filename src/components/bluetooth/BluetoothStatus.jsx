import { Badge } from "@/components/ui/badge";
import { Bluetooth, BluetoothOff, Loader2 } from "lucide-react";

export default function BluetoothStatus({ status = "disconnected", deviceName }) {
  const config = {
    connected: {
      label: deviceName || "Demo Reader",
      className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
      Icon: Bluetooth,
    },
    connecting: {
      label: "Pairing…",
      className: "bg-amber-500/15 text-amber-700 border-amber-500/20",
      Icon: Loader2,
    },
    disconnected: {
      label: "Offline",
      className: "bg-slate-500/10 text-slate-600 border-slate-500/20",
      Icon: BluetoothOff,
    },
  }[status] || {};

  const Icon = config.Icon || BluetoothOff;

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className || ""}`}>
      <Icon className={`h-3.5 w-3.5 ${status === "connecting" ? "animate-spin" : ""}`} />
      {config.label || status}
    </Badge>
  );
}
