import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function RegisterPage() {
  const dict = getDictionary(await getLocale());
  const d = dict.auth.register;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{d.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm dict={d} />
        <p className="text-center text-sm text-muted-foreground">
          {d.haveAccount}{" "}
          <Link href="/login" className="font-medium text-foreground underline">
            {d.signIn}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
