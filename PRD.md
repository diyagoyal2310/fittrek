# Product Requirement & Technical Architecture Document (PRD): FitPulse AI

**Product Name:** FitPulse AI  
**Framework Target:** Next.js (App Router / React 19)  
**Core Stack:** Next.js, TypeScript, Tailwind CSS, Shadcn UI, Prisma ORM, PostgreSQL, Auth.js v5

---

## 1. Executive Summary & Product Vision

**FitPulse AI** is an intelligent Progressive Web Application (PWA) designed to optimize bodybuilding, muscle gain, fat loss, and body recomposition goals by continuously balancing training stress with real-time calorie recovery metrics.

By integrating biometrics from Xiaomi / Mi Watch ecosystems (via Google Health Connect or aggregation APIs like Spike), FitPulse AI analyzes basal metabolic rate (BMR), active calorie expenditure, Heart Rate Variability (HRV), and sleep recovery. It leverages adaptive algorithms to recommend auto-regulated strength workouts and hyper-targeted nutrition plans tailored specifically to the user's daily readiness and weekly adaptation rate.

---

## 2. Target User Personas & Goals

### **Persona A: The Bodybuilding / Recomp Lifter**
* **Goal:** Gain lean muscle while keeping body fat low or undergo body recomposition.
* **Pain Point:** Overtraining on under-recovered days, causing plateaus, elevated fatigue, and poor progressive overload.

### **Persona B: The Fat-Loss / Cut Athlete**
* **Goal:** Maximize fat loss while retaining hard-earned muscle mass.
* **Pain Point:** Miscalculating daily calorie deficits due to inaccurate active burn estimates from daily wear.

---

## 3. High-Level Architecture & Integration Strategy

FitPulse AI utilizes Next.js React Server Components (RSC) for fast initial page renders, Server Actions for data mutations, and specialized Route Handlers for high-throughput health data webhooks.

┌────────────────────────────────────────────────────────────────────────┐│                        DATA INGESTION PIPELINE                         ││                                                                        ││   [ Mi Watch / Band ] ──► [ Mi Fitness App ]                           ││                                 │                                      ││                   ┌─────────────┴─────────────┐                        ││                   ▼                           ▼                        ││       [ Google Health Connect ]      [ Spike / Health API ]            │└───────────────────┬───────────────────────────┬────────────────────────┘│                           │└─────────────┬─────────────┘▼┌────────────────────────────────────────────────────────────────────────┐│                        NEXT.JS BACKEND LAYER                           ││                                                                        ││   [ Route Handler: /api/webhooks/health ]                              ││                          │                                             ││                          ▼                                             ││   [ Server Actions / Algorithms ] ──► [ Prisma ORM ] ──► [ PostgreSQL ]│└──────────────────────────┬─────────────────────────────────────────────┘│▼┌────────────────────────────────────────────────────────────────────────┐│                        NEXT.JS FRONTEND LAYER                          ││                                                                        ││   [ React Server Components ] ──► Fast Dashboard & Recovery Score      ││   [ Client Components ]       ──► Dynamic Workout & Macro Trackers     │└────────────────────────────────────────────────────────────────────────┘
---

## 4. Next.js Tech Stack & Directory Structure

* **Framework:** Next.js (App Router, TypeScript)
* **UI & Styling:** Tailwind CSS, Shadcn UI, Lucide Icons, Recharts (Analytics)
* **Database & ORM:** PostgreSQL + Prisma ORM
* **Auth:** Auth.js (NextAuth v5) with OAuth providers
* **State & Data:** React Server Components, Server Actions, TanStack Query (for real-time biometric polling)

fitpulse-ai/├── src/│   ├── app/│   │   ├── (auth)/│   │   │   ├── login/page.tsx│   │   │   └── register/page.tsx│   │   ├── (dashboard)/│   │   │   ├── dashboard/page.tsx             # Recovery & Readiness Dashboard│   │   │   ├── workouts/│   │   │   │   ├── page.tsx                    # Active Workout Session│   │   │   │   └── [id]/page.tsx               # Exercise Details│   │   │   ├── nutrition/page.tsx              # Adaptive Macro Planner│   │   │   └── analytics/page.tsx              # Progress & Recomp Charts│   │   ├── api/│   │   │   ├── webhooks/│   │   │   │   └── health/route.ts             # Mi Watch Ingest API│   │   │   └── auth/[...nextauth]/route.ts│   │   ├── layout.tsx│   │   └── page.tsx│   ├── components/│   │   ├── ui/                                 # Shadcn Components│   │   ├── dashboard/│   │   │   ├── RecoveryGauge.tsx│   │   │   └── BiometricCard.tsx│   │   └── workouts/│   │       ├── ActiveSetLogger.tsx│   │       └── RpeSelector.tsx│   ├── lib/│   │   ├── algorithms/│   │   │   ├── recoveryCalculator.ts           # CRB & HRV Readiness Math│   │   │   └── progressiveOverload.ts          # Auto-RPE Volume Adjuster│   │   ├── db/│   │   │   └── prisma.ts                       # Singleton Prisma Client│   │   └── utils.ts│   └── actions/                                # Next.js Server Actions│       ├── workoutActions.ts│       ├── nutritionActions.ts│       └── biometricActions.ts├── prisma/│   └── schema.prisma                           # Database Models└── public/└── manifest.json                           # PWA Configuration
---

## 5. Key Modules & Functional Requirements

### **Module 1: Mi Watch Data Ingestion & Calorie Recovery Engine**
* **FR-1.1 Webhook Endpoint (`/api/webhooks/health`):** Receives automated JSON payloads containing Active Calories, Resting Heart Rate (RHR), Sleep Stages, and HRV.
* **FR-1.2 Real-Time Calorie Recovery Balance ($CRB$):** Computes total daily expenditure:
  $$\text{TDEE} = \text{BMR} + \text{Active Burn (Mi Watch)} + \text{TEF (Thermic Effect of Food)}$$
* **FR-1.3 Readiness Gauge:** Renders a 0–100% daily recovery score on `/dashboard`, color-coded by capacity:
  * Low ($<50\%$): Red (Active recovery suggested)
  * Moderate ($50\text{--}80\%$): Yellow (Standard training volume)
  * High ($>80\%$): Green (Progressive overload / PR attempt)

### **Module 2: AI Adaptive Workout Engine**
* **FR-2.1 Dynamic Program Selection:** Supports **Bodybuilding (Hypertrophy)**, **Fat Loss (Cut)**, **Lean Gain (Bulk)**, and **Recomposition**.
* **FR-2.2 Auto-Regulated RPE & Volume Scaling:** Executed during set completion in `logWorkoutSet()`. Automatically adjusts planned workout volume down by 25% if daily readiness is $<50\%$.

### **Module 3: Adaptive Nutrition & Diet Planning**
* **FR-3.1 Macro Split Generator:**
  * **Cut:** $2.4\text{g/kg}$ Protein, 20% Caloric Deficit
  * **Bulk:** $2.0\text{g/kg}$ Protein, 10% Caloric Surplus
  * **Recomp:** $2.2\text{g/kg}$ Protein, Maintenance Calories with Carb Cycling (High Carb on heavy training days)
* **FR-3.2 Food & Meal Logger:** Instant macro tracking backed by server actions.

---

## 6. Prisma Database Schema (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Goal {
  CUT
  BULK
  RECOMP
  HYPERTROPHY
}

model User {
  id            String          @id @default(cuid())
  email         String          @unique
  name          String?
  goal          Goal            @default(RECOMP)
  weightKg      Float
  heightCm      Float
  bodyFatPct    Float?
  biometrics    BiometricLog[]
  workouts      WorkoutSession[]
  nutritionLogs NutritionLog[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model BiometricLog {
  id               String   @id @default(cuid())
  userId           String
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date             DateTime @default(now())
  activeCalories   Float
  restingHeartRate Int?
  sleepScore       Float?
  hrv              Float?
  recoveryScore    Float
  rawPayload       Json?
}

model WorkoutSession {
  id          String       @id @default(cuid())
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  completedAt DateTime?
  sets        WorkoutSet[]
}

model WorkoutSet {
  id               String         @id @default(cuid())
  workoutSessionId String
  workoutSession   WorkoutSession @relation(fields: [workoutSessionId], references: [id], onDelete: Cascade)
  exerciseName     String
  weightKg         Float
  reps             Int
  rpe              Float?
}

model NutritionLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date      DateTime @default(now())
  calories  Float
  proteinG  Float
  carbsG    Float
  fatG      Float
}
7. Core Next.js Implementation CodeRecovery Score Math (src/lib/algorithms/recoveryCalculator.ts)TypeScriptexport function calculateRecoveryScore(params: {
  sleepScore: number;
  hrv: number;
  baselineHrv: number;
  activeCalories: number;
}): number {
  const { sleepScore, hrv, baselineHrv } = params;

  // Weightings: Sleep (40%), HRV Ratio (60%)
  const hrvRatio = Math.min(hrv / baselineHrv, 1.2);
  const hrvScore = hrvRatio * 100;

  const totalScore = (sleepScore * 0.4) + (hrvScore * 0.6);
  return Math.round(Math.min(Math.max(totalScore, 0), 100));
}
Health Webhook Handler (src/app/api/webhooks/health/route.ts)TypeScriptimport { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";
import { calculateRecoveryScore } from "@/lib/algorithms/recoveryCalculator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, activeCalories, sleepScore, hrv, restingHeartRate } = body;

    const recoveryScore = calculateRecoveryScore({
      sleepScore: sleepScore || 70,
      hrv: hrv || 50,
      baselineHrv: 55,
      activeCalories: activeCalories || 0,
    });

    await db.biometricLog.create({
      data: {
        userId,
        activeCalories,
        sleepScore,
        hrv,
        restingHeartRate,
        recoveryScore,
        rawPayload: body,
      },
    });

    return NextResponse.json({ success: true, recoveryScore }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Webhook ingest failed" }, { status: 500 });
  }
}
Server Action for Logging Workout Sets (src/actions/workoutActions.ts)TypeScript'use server'

import { db } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function logWorkoutSet(data: {
  sessionId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  rpe: number;
}) {
  await db.workoutSet.create({
    data: {
      workoutSessionId: data.sessionId,
      exerciseName: data.exerciseName,
      weightKg: data.weightKg,
      reps: data.reps,
      rpe: data.rpe,
    },
  });

  revalidatePath("/workouts");
}
8. Non-Functional Requirements & Success MetricsPerformance: First Contentful Paint (FCP) $< 1.0\text{s}$ using Next.js Server Components.PWA & Offline Capability: Fully installable via manifest.json with service worker support for gym floor usage.Data Security: Encrypted biometrics data in transit (TLS 1.3) and at rest (AES-256).Success KPIs:$> 98\%$ successful daily data sync from Mi Watch / Health Connect.$> 40\%$ 30-day active user retention ra