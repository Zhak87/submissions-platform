import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Team } from "@/components/Team";
import { SubmissionForm } from "@/components/SubmissionForm";
import { Footer } from "@/components/Footer";

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <HowItWorks />
        <Team />
        <SubmissionForm />
      </main>
      <Footer />
    </>
  );
}
