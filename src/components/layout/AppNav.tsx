import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locale";
import { NavLinks } from "@/components/layout/NavLinks";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function AppNav({
  userLabel,
  dict,
  locale,
}: {
  userLabel: string;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <Activity className="h-5 w-5" aria-hidden="true" />
          {dict.nav.appName}
        </div>
        <NavLinks dict={dict.nav} />
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <span className="text-sm text-muted-foreground">{userLabel}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              {dict.common.signOut}
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
