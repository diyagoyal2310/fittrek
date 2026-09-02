"use client";

import { motion } from "framer-motion";

export function DiagramFrame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-xl border bg-card p-4"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
      <p className="mt-3 text-xs text-muted-foreground">{caption}</p>
    </motion.div>
  );
}
