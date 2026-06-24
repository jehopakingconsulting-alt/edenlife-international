"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";

const localeLabels: Record<string, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

const localeFlags: Record<string, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const currentLocale = (params.locale as string) || "fr";

  function switchLocale(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: locale as "fr" | "en" | "es" });
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 px-1 py-0.5">
      {(["fr", "en", "es"] as const).map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
            currentLocale === locale
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
