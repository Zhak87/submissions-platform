"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { submissionSchema, type SubmissionFormValues } from "@/lib/submissionSchema";

const CATEGORY_KEYS = [
  "business",
  "medicine",
  "education",
  "government",
  "other",
] as const;

export function SubmissionForm() {
  const t = useTranslations("form");
  const locale = useLocale() as "ru" | "kz";
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      category: "",
      problemDescription: "",
      proposedSolution: "",
      language: locale,
      website: "",
    },
  });

  async function onSubmit(values: SubmissionFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, language: locale }),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      setStatus("success");
      reset({ ...values, name: "", company: "", phone: "", email: "", category: "", problemDescription: "", proposedSolution: "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id="form"
        className="mx-auto max-w-xl scroll-mt-24 rounded-3xl bg-emerald-50 px-8 py-16 text-center ring-1 ring-emerald-100"
      >
        <h2 className="text-2xl font-bold text-emerald-900">
          {t("success.title")}
        </h2>
        <p className="mt-3 text-emerald-800">{t("success.body")}</p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";
  const labelClass = "block text-sm font-medium text-slate-700";
  const errorClass = "mt-1.5 text-sm text-red-600";

  function fieldError(key: keyof SubmissionFormValues) {
    const err = errors[key];
    if (!err) return null;

    let translationKey: "required" | "email" | "phone" | "minLength" = "required";
    if (err.type === "invalid_format") {
      translationKey = key === "phone" ? "phone" : "email";
    } else if (err.type === "too_small" && key === "problemDescription") {
      translationKey = "minLength";
    }

    return <p className={errorClass}>{t(`errors.${translationKey}`)}</p>;
  }

  return (
    <div id="form" className="mx-auto max-w-2xl scroll-mt-24 px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-slate-600">{t("subtitle")}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-10 space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
      >
        {/* Honeypot — hidden from real users, left empty */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="name">
            {t("fields.name.label")}
          </label>
          <input
            id="name"
            className={inputClass}
            placeholder={t("fields.name.placeholder")}
            {...register("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            {t("fields.company.label")}
          </label>
          <input
            id="company"
            className={inputClass}
            placeholder={t("fields.company.placeholder")}
            {...register("company")}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="phone">
              {t("fields.phone.label")}
            </label>
            <input
              id="phone"
              type="tel"
              className={inputClass}
              placeholder={t("fields.phone.placeholder")}
              {...register("phone")}
            />
            {fieldError("phone")}
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              {t("fields.email.label")}
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder={t("fields.email.placeholder")}
              {...register("email")}
            />
            {fieldError("email")}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="category">
            {t("fields.category.label")}
          </label>
          <select
            id="category"
            className={inputClass}
            defaultValue=""
            {...register("category")}
          >
            <option value="">{t("fields.category.placeholder")}</option>
            {CATEGORY_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`categoryOptions.${key}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="problemDescription">
            {t("fields.problem.label")}
          </label>
          <textarea
            id="problemDescription"
            rows={5}
            className={inputClass}
            placeholder={t("fields.problem.placeholder")}
            {...register("problemDescription")}
          />
          {fieldError("problemDescription")}
        </div>

        <div>
          <label className={labelClass} htmlFor="proposedSolution">
            {t("fields.solution.label")}
          </label>
          <textarea
            id="proposedSolution"
            rows={4}
            className={inputClass}
            placeholder={t("fields.solution.placeholder")}
            {...register("proposedSolution")}
          />
        </div>

        {status === "error" && (
          <p className={errorClass}>{t("errors.generic")}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform hover:scale-[1.01] hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
