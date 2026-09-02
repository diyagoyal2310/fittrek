"use client";

import { useState } from "react";
import { ScanBarcode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarcodeScanner } from "@/components/nutrition/BarcodeScanner";
import { lookupBarcode, logScannedMeal, type BarcodeLookupResult } from "@/actions/nutritionActions";
import type { Dictionary } from "@/lib/i18n/types";

type Stage = "scanning" | "looking-up" | "found" | "not-found" | "adding";

export function ScanMealDialog({ dict }: { dict: Dictionary["nutrition"]["scan"] }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("scanning");
  const [product, setProduct] = useState<BarcodeLookupResult | null>(null);
  const [grams, setGrams] = useState(100);

  function reset() {
    setStage("scanning");
    setProduct(null);
    setGrams(100);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    reset();
  }

  async function handleDetected(code: string) {
    setStage("looking-up");
    const result = await lookupBarcode(code);
    if (!result) {
      setStage("not-found");
      return;
    }
    setProduct(result);
    setGrams(result.servingSizeG ?? 100);
    setStage("found");
  }

  async function handleAdd() {
    if (!product) return;
    setStage("adding");
    const factor = grams / 100;
    await logScannedMeal({
      mealName: product.name,
      calories: Math.round(product.caloriesPer100g * factor),
      proteinG: Math.round(product.proteinPer100gG * factor),
      carbsG: Math.round(product.carbsPer100gG * factor),
      fatG: Math.round(product.fatPer100gG * factor),
    });
    setOpen(false);
    reset();
  }

  const factor = grams / 100;

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)} className="gap-1.5">
        <ScanBarcode className="h-4 w-4" aria-hidden="true" />
        {dict.button}
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.dialogTitle}</DialogTitle>
          </DialogHeader>

          {stage === "scanning" && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{dict.instructions}</p>
              <BarcodeScanner
                onDetected={handleDetected}
                errorLabel={dict.cameraError}
                requestingLabel={dict.requestingCamera}
              />
            </div>
          )}

          {stage === "looking-up" && (
            <p className="py-6 text-center text-sm text-muted-foreground">{dict.lookingUp}</p>
          )}

          {stage === "not-found" && (
            <div className="space-y-3">
              <p className="text-sm font-medium">{dict.notFound}</p>
              <p className="text-sm text-muted-foreground">{dict.notFoundHint}</p>
              <Button type="button" variant="outline" onClick={reset}>
                {dict.scanAnother}
              </Button>
            </div>
          )}

          {(stage === "found" || stage === "adding") && product && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {dict.found}: {Math.round(product.caloriesPer100g)} kcal · P
                  {Math.round(product.proteinPer100gG)}g · C{Math.round(product.carbsPer100gG)}g · F
                  {Math.round(product.fatPer100gG)}g ({dict.per100g})
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="scan-grams">{dict.grams}</Label>
                <Input
                  id="scan-grams"
                  type="number"
                  min={1}
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value) || 0)}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 rounded-lg border bg-muted/40 p-3 text-center text-sm">
                <Stat label="kcal" value={Math.round(product.caloriesPer100g * factor)} />
                <Stat label="P" value={Math.round(product.proteinPer100gG * factor)} />
                <Stat label="C" value={Math.round(product.carbsPer100gG * factor)} />
                <Stat label="F" value={Math.round(product.fatPer100gG * factor)} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={reset} disabled={stage === "adding"}>
                  {dict.scanAnother}
                </Button>
                <Button type="button" onClick={handleAdd} disabled={stage === "adding" || grams <= 0}>
                  {stage === "adding" ? dict.adding : dict.addToLog}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
