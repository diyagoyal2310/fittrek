import { getLocale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { PageTransition } from "@/components/motion/PageTransition";

export default async function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-app-surface p-4">
      <div className="flex w-full max-w-md justify-end">
        <LanguageSwitcher currentLocale={locale} />
      </div>
      <div className="w-full max-w-md">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
