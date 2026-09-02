import { Dumbbell, UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/FadeIn";
import { MacroSplitDonut } from "@/components/knowledge/diagrams/MacroSplitDonut";
import { ProgressiveOverloadDiagram } from "@/components/knowledge/diagrams/ProgressiveOverloadDiagram";
import { RecoveryBandDiagram } from "@/components/knowledge/diagrams/RecoveryBandDiagram";
import { TdeeStackedBar } from "@/components/knowledge/diagrams/TdeeStackedBar";
import { ProteinDistributionDiagram } from "@/components/knowledge/diagrams/ProteinDistributionDiagram";
import { CarbCyclingDiagram } from "@/components/knowledge/diagrams/CarbCyclingDiagram";
import { HydrationDiagram } from "@/components/knowledge/diagrams/HydrationDiagram";
import { RpeScaleDiagram } from "@/components/knowledge/diagrams/RpeScaleDiagram";
import { TrainingSplitCalendar } from "@/components/knowledge/diagrams/TrainingSplitCalendar";
import { OvertrainingTrendDiagram } from "@/components/knowledge/diagrams/OvertrainingTrendDiagram";
import { getLocale, getDictionary } from "@/lib/i18n";
import { nutritionArticles } from "@/lib/knowledge/nutritionArticles";
import { workoutArticles } from "@/lib/knowledge/workoutArticles";
import type { Dictionary } from "@/lib/i18n/types";

export default async function LearnPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const d = dict.learn;

  const nutrition = nutritionArticles[locale];
  const workouts = workoutArticles[locale];

  // One visual diagram per article, in the same order as the article arrays.
  const nutritionDiagrams: ((dict: Dictionary) => React.ReactNode)[] = [
    (dict) => <MacroSplitDonut caption={dict.learn.diagrams.macroSplitCaption} macros={dict.nutrition.macros} />,
    (dict) => (
      <TdeeStackedBar
        caption={dict.learn.diagrams.tdeeCaption}
        labels={{
          bmr: dict.learn.diagrams.tdeeBmr,
          active: dict.learn.diagrams.tdeeActive,
          tef: dict.learn.diagrams.tdeeTef,
        }}
      />
    ),
    (dict) => (
      <ProteinDistributionDiagram
        caption={dict.learn.diagrams.proteinDistributionCaption}
        mealLabel={dict.nutrition.form.mealLabel}
      />
    ),
    (dict) => (
      <CarbCyclingDiagram
        caption={dict.learn.diagrams.carbCyclingCaption}
        trainingDayLabel={dict.learn.diagrams.trainingDay}
        restDayLabel={dict.learn.diagrams.restDay}
      />
    ),
    (dict) => <HydrationDiagram caption={dict.learn.diagrams.hydrationCaption} />,
  ];

  const workoutDiagrams: ((dict: Dictionary) => React.ReactNode)[] = [
    (dict) => (
      <ProgressiveOverloadDiagram
        caption={dict.learn.diagrams.progressiveOverloadCaption}
        weeksLabel={dict.learn.diagrams.progressiveOverloadWeeks}
      />
    ),
    (dict) => <RpeScaleDiagram caption={dict.learn.diagrams.rpeCaption} rpeLabel={dict.workouts.logger.rpe} />,
    (dict) => <RecoveryBandDiagram caption={dict.learn.diagrams.recoveryBandCaption} bands={dict.dashboard.bands} />,
    (dict) => (
      <TrainingSplitCalendar
        caption={dict.learn.diagrams.trainingSplitCaption}
        labels={{
          push: dict.learn.diagrams.push,
          pull: dict.learn.diagrams.pull,
          legs: dict.learn.diagrams.legs,
          rest: dict.learn.diagrams.rest,
        }}
      />
    ),
    (dict) => <OvertrainingTrendDiagram caption={dict.learn.diagrams.overtrainingCaption} />,
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-semibold">{d.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
      </FadeIn>

      <Tabs defaultValue="nutrition">
        <TabsList>
          <TabsTrigger value="nutrition" className="gap-1.5">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
            {d.tabs.nutrition}
          </TabsTrigger>
          <TabsTrigger value="workouts" className="gap-1.5">
            <Dumbbell className="h-4 w-4" aria-hidden="true" />
            {d.tabs.workouts}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="mt-4">
          <StaggerGroup className="rounded-xl border bg-card px-4">
            <Accordion defaultValue={[0]}>
              {nutrition.map((article, i) => (
                <StaggerItem key={article.title}>
                  <AccordionItem value={i}>
                    <AccordionTrigger>
                      <div>
                        <p>{article.title}</p>
                        <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                          {article.summary}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {nutritionDiagrams[i]?.(dict)}
                      {article.body.map((paragraph, j) => (
                        <p key={j} className="text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerGroup>
        </TabsContent>

        <TabsContent value="workouts" className="mt-4">
          <StaggerGroup className="rounded-xl border bg-card px-4">
            <Accordion defaultValue={[0]}>
              {workouts.map((article, i) => (
                <StaggerItem key={article.title}>
                  <AccordionItem value={i}>
                    <AccordionTrigger>
                      <div>
                        <p>{article.title}</p>
                        <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                          {article.summary}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {workoutDiagrams[i]?.(dict)}
                      {article.body.map((paragraph, j) => (
                        <p key={j} className="text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
}
