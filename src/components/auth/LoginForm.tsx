"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Dictionary } from "@/lib/i18n/types";

export function LoginForm({
  oauthAvailable,
  dict,
}: {
  oauthAvailable: { google: boolean; github: boolean };
  dict: Dictionary["auth"]["login"];
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError(dict.invalidCredentials);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleCredentialsSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="email">{dict.email}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">{dict.password}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-sm text-status-critical">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? dict.signingIn : dict.signIn}
        </Button>
      </form>

      {(oauthAvailable.google || oauthAvailable.github) && (
        <>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">{dict.or}</span>
            <Separator className="flex-1" />
          </div>
          <div className="space-y-2">
            {oauthAvailable.google && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                {dict.continueWithGoogle}
              </Button>
            )}
            {oauthAvailable.github && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                {dict.continueWithGithub}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
