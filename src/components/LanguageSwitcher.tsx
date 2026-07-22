"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const LABELS: Record<string, string> = {
  ru: "RU",
  kz: "KZ",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleSwitch(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- pathname is dynamically typed by next-intl
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-sm font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleSwitch(loc)}
          aria-current={loc === locale}
          className={`rounded-full px-3 py-1 transition-colors ${
            loc === locale
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
