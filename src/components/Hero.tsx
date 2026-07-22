import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl"
      >
        <div className="h-72 w-[36rem] rounded-full bg-gradient-to-tr from-indigo-200 via-indigo-100 to-white opacity-70" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
          {t("subtitle")}
        </p>
        <a
          href="#form"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform hover:scale-[1.03] hover:bg-indigo-500"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
