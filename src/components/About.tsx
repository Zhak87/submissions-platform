import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-slate-600">
        {t("body")}
      </p>
    </section>
  );
}
