import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bluetooth, BluetoothOff, ScanLine, Keyboard } from "lucide-react";
import BluetoothStatus from "@/components/bluetooth/BluetoothStatus";
import { motion, AnimatePresence } from "framer-motion";

export default function ScannerPanel({ bluetoothStatus, deviceName, error, onConnect, onDisconnect, onSimulateScan, lastScanResult }) {
  const [manualId, setManualId] = useState("");
  const [showManual, setShowManual] = useState(false);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      onSimulateScan(manualId.trim());
      setManualId("");
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Card Scanner</h2>
          <BluetoothStatus status={bluetoothStatus} deviceName={deviceName} />
        </div>

        <div className="flex flex-col items-center py-8">
          <motion.div
            className="relative"
            animate={bluetoothStatus === "connected" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-32 h-32 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border-2 border-primary-foreground/20">
              <ScanLine className="h-14 w-14 text-primary-foreground/90" />
            </div>
            {bluetoothStatus === "connected" && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>

          <p className="mt-6 text-sm text-primary-foreground/70 text-center max-w-xs">
            {bluetoothStatus === "connected"
              ? "Ready — Scan a student ID card to check in or out"
              : "Connect your Bluetooth card reader to start scanning"}
          </p>
        </div>

        <AnimatePresence>
          {lastScanResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg p-3 text-sm font-medium text-center ${
                lastScanResult.type === "check_in"
                  ? "bg-accent/20 text-accent-foreground"
                  : lastScanResult.type === "check_out"
                  ? "bg-primary-foreground/20"
                  : "bg-destructive/20 text-destructive-foreground"
              }`}
            >
              {lastScanResult.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CardContent className="p-4 space-y-3">
        {bluetoothStatus === "disconnected" && (
          <Button onClick={onConnect} className="w-full gap-2" size="lg">
            <Bluetooth className="h-4 w-4" />
            Connect Card Reader
          </Button>
        )}

        {bluetoothStatus === "connecting" && (
          <Button disabled className="w-full gap-2" size="lg">
            <Bluetooth className="h-4 w-4 animate-pulse" />
            Connecting...
          </Button>
        )}

        {bluetoothStatus === "connected" && (
          <Button onClick={onDisconnect} variant="outline" className="w-full gap-2" size="lg">
            <BluetoothOff className="h-4 w-4" />
            Disconnect Reader
          </Button>
        )}

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full gap-2 text-muted-foreground"
            onClick={() => setShowManual(!showManual)}
          >
            <Keyboard className="h-3.5 w-3.5" />
            {showManual ? "Hide manual entry" : "Manual ID entry (for testing)"}
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
                  placeholder="Enter student ID..."
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="font-mono"
                />
                <Button type="submit" size="sm">
                  Scan
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}