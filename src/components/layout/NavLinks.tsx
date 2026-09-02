"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, GraduationCap, LayoutDashboard, LineChart, UtensilsCrossed } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function NavLinks({ dict }: { dict: Dictionary["nav"] }) {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", label: dict.dashboard, Icon: LayoutDashboard },
    { href: "/workouts", label: dict.workouts, Icon: Dumbbell },
    { href: "/nutrition", label: dict.nutrition, Icon: UtensilsCrossed },
    { href: "/analytics", label: dict.analytics, Icon: LineChart },
    { href: "/learn", label: dict.learn, Icon: GraduationCap },
  ];

  return (
    <nav className="flex items-center gap-1">
      {items.map(({ href, label, Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-md bg-[linear-gradient(180deg,color-mix(in_oklch,var(--accent),var(--chart-1)_10%),var(--accent))] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
