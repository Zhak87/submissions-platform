import { useTranslations } from "next-intl";

const AVATAR_COLORS = [
  "bg-indigo-200",
  "bg-amber-200",
  "bg-emerald-200",
  "bg-rose-200",
];

export function Team() {
  const t = useTranslations("team");

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-slate-600">
        {t("body")}
      </p>

      <div className="mt-10 flex justify-center -space-x-3">
        {AVATAR_COLORS.map((color) => (
          <div
            key={color}
            aria-hidden
            className={`h-14 w-14 rounded-full border-4 border-white ${color}`}
          />
        ))}
      </div>
    </section>
  );
}
