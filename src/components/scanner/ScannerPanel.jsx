import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bluetooth, BluetoothOff, ScanLine, Keyboard, BadgeCheck } from "lucide-react";
import BluetoothStatus from "@/components/bluetooth/BluetoothStatus";
import { motion, AnimatePresence } from "framer-motion";

export default function ScannerPanel({ bluetoothStatus, deviceName, error, onConnect, onDisconnect, onSimulateScan, lastScanResult, demoMode = false }) {
  const [manualId, setManualId] = useState("");
  const [showManual, setShowManual] = useState(!demoMode);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      onSimulateScan(manualId.trim());
      setManualId("");
    }
  };

  const readerTitle = demoMode ? "Card scanner" : "Bathroom sign-out / sign-in";
  const readyText = demoMode
    ? "Ready — scan a student ID card to sign out or sign back in"
    : "Type a student ID to sign out; type the same ID again to sign back in";

  return (
    <Card className="overflow-hidden border-0 bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur dark:bg-slate-950/90 dark:shadow-black/20">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary to-indigo-500 p-6 text-primary-foreground">
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 left-8 h-44 w-44 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">{readerTitle}</h2>
          {demoMode ? <BluetoothStatus status={bluetoothStatus} deviceName={deviceName} /> : <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Live entry</span>}
        </div>

        <div className="relative flex flex-col items-center py-8">
          <motion.div
            className="relative"
            animate={bluetoothStatus === "connected" || !demoMode ? { scale: [1, 1.04, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2.4 }}
          >
            <div className="w-32 h-32 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border-2 border-primary-foreground/20 shadow-2xl">
              {demoMode ? <ScanLine className="h-14 w-14 text-primary-foreground/90" /> : <BadgeCheck className="h-14 w-14 text-primary-foreground/90" />}
            </div>
            {(bluetoothStatus === "connected" || !demoMode) && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
            )}
          </motion.div>

          <p className="mt-6 text-sm text-primary-foreground/75 text-center max-w-xs">
            {bluetoothStatus === "connected" || !demoMode
              ? readyText
              : "Connect the virtual card reader to present without hardware"}
          </p>
        </div>

        <AnimatePresence>
          {lastScanResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`relative rounded-xl p-3 text-sm font-medium text-center backdrop-blur ${
                lastScanResult.type === "check_in"
                  ? "bg-accent/25 text-white"
                  : lastScanResult.type === "check_out"
                  ? "bg-white/20 text-white"
                  : "bg-destructive/30 text-white"
              }`}
            >
              {lastScanResult.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CardContent className="p-4 space-y-3">
        {demoMode && bluetoothStatus === "disconnected" && (
          <Button onClick={onConnect} className="w-full gap-2 bg-slate-950 hover:bg-slate-800" size="lg">
            <Bluetooth className="h-4 w-4" />
            Connect virtual reader
          </Button>
        )}

        {demoMode && bluetoothStatus === "connecting" && (
          <Button disabled className="w-full gap-2" size="lg">
            <Bluetooth className="h-4 w-4 animate-pulse" />
            Connecting...
          </Button>
        )}

        {demoMode && bluetoothStatus === "connected" && (
          <Button onClick={onDisconnect} variant="outline" className="w-full gap-2" size="lg">
            <BluetoothOff className="h-4 w-4" />
            Disconnect reader
          </Button>
        )}

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">{error}</p>
        )}

        <div className="border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full gap-2 text-muted-foreground"
            onClick={() => setShowManual(!showManual)}
          >
            <Keyboard className="h-3.5 w-3.5" />
            {showManual ? "Hide ID entry" : demoMode ? "Manual ID entry" : "Sign out / sign in by ID"}
          </Button>

          <AnimatePresence>
            {showManual && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleManualSubmit}
                className="flex gap-2 mt-2 overflow-hidden"
              >
                <Input
                  placeholder={demoMode ? "Try STU-1001..." : "Enter student ID..."}
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="font-mono"
                />
                <Button type="submit" size="sm">
                  Submit
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
