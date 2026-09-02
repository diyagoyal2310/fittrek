import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppNav } from "@/components/layout/AppNav";
import { PageTransition } from "@/components/motion/PageTransition";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen bg-app-surface">
      <AppNav userLabel={session.user.name ?? session.user.email ?? ""} dict={dict} locale={locale} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
