import { en } from "@/lib/i18n/dictionaries/en";
import { hi } from "@/lib/i18n/dictionaries/hi";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locale";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { getLocale } from "@/lib/i18n/getLocale";
export * from "@/lib/i18n/locale";
export type { Dictionary } from "@/lib/i18n/types";
