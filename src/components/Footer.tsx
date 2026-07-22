import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

const CONTACT_EMAIL = "hello@example.com";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-slate-900">
            {t("contacts")}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <LanguageSwitcher />

        <p className="text-center text-sm text-slate-400 sm:text-right">
          {t("rights", { year })}
        </p>
      </div>
    </footer>
  );
}
