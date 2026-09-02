import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BiometricCard({
  label,
  value,
  unit,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-2">
        <div className="rounded-md bg-muted p-2">
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold tabular-nums">
            {value}
            {unit ? <span className="ml-1 text-xs text-muted-foreground">{unit}</span> : null}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
