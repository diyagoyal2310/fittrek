"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";
import { motion } from "framer-motion";

export function BarcodeScanner({
  onDetected,
  errorLabel,
  requestingLabel,
}: {
  onDetected: (code: string) => void;
  errorLabel: string;
  requestingLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const onDetectedRef = useRef(onDetected);
  onDetectedRef.current = onDetected;
  const [status, setStatus] = useState<"requesting" | "scanning" | "error">("requesting");

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let cancelled = false;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current ?? undefined, (result, _error, controls) => {
        controlsRef.current = controls;
        if (cancelled) return;
        setStatus("scanning");
        if (result) {
          controls.stop();
          onDetectedRef.current(result.getText());
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
      {status !== "scanning" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-4 text-center text-sm text-white">
          {status === "error" ? errorLabel : requestingLabel}
        </div>
      )}
      {status === "scanning" && (
        <motion.div
          className="pointer-events-none absolute inset-10 rounded-lg border-2"
          style={{ borderColor: "var(--chart-1)" }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
