import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function LoginPage() {
  const dict = getDictionary(await getLocale());
  const d = dict.auth.login;

  const oauthAvailable = {
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{d.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm oauthAvailable={oauthAvailable} dict={d} />
        <p className="text-center text-sm text-muted-foreground">
          {d.noAccount}{" "}
          <Link href="/register" className="font-medium text-foreground underline">
            {d.register}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
