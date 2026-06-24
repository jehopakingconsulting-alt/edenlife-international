import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Heart,
  GraduationCap,
  Stethoscope,
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Lightbulb,
  Leaf,
  Quote,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div>
              <div className="inline-block rounded-xl bg-white px-5 py-3 shadow-lg mb-6">
                <Image
                  src="/logo-edenlife.png"
                  alt="EDENLIFE International"
                  width={220}
                  height={66}
                  priority
                  className="h-14 w-auto"
                />
              </div>
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                {t("hero.badge")}
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                {t("hero.title")}
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/donate"
                  className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
                >
                  {t("hero.cta_donate")}
                </a>
                <a
                  href="#join"
                  className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {t("hero.cta_join")}
                </a>
                <a
                  href="#projects"
                  className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {t("hero.cta_discover")}
                </a>
              </div>
            </div>
            {/* Right — Flag floating */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative animate-[float_4s_ease-in-out_infinite]">
                <Image
                  src="/flag-edenlife.png"
                  alt="Drapeau EDENLIFE International"
                  width={600}
                  height={600}
                  priority
                  className="w-[520px] h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "2009", label: t("stats.founded") },
            { value: "2500+", label: t("stats.ambassadors") },
            { value: "25+", label: t("stats.projects") },
            { value: "4500+", label: t("stats.partners") },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {t("mission.label")}
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("mission.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t("mission.description")}
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: t("mission.education"),
                desc: t("mission.education_desc"),
                color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
              },
              {
                icon: Stethoscope,
                title: t("mission.health"),
                desc: t("mission.health_desc"),
                color: "bg-red-100 text-red-600 dark:bg-red-900/30",
              },
              {
                icon: Briefcase,
                title: t("mission.training"),
                desc: t("mission.training_desc"),
                color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
              },
              {
                icon: TrendingUp,
                title: t("mission.development"),
                desc: t("mission.development_desc"),
                color: "bg-green-100 text-green-600 dark:bg-green-900/30",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex rounded-xl p-3 ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {t("values.label")}
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("values.title")}
            </h2>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: t("values.integrity"),
                desc: t("values.integrity_desc"),
              },
              {
                icon: Users,
                title: t("values.solidarity"),
                desc: t("values.solidarity_desc"),
              },
              {
                icon: Lightbulb,
                title: t("values.innovation"),
                desc: t("values.innovation_desc"),
              },
              {
                icon: Leaf,
                title: t("values.sustainability"),
                desc: t("values.sustainability_desc"),
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {t("philosophy.label")}
          </span>
          <Quote className="mx-auto mt-6 h-10 w-10 text-blue-300" />
          <blockquote className="mt-4 text-3xl font-bold italic text-blue-700 dark:text-blue-400 sm:text-4xl">
            {t("philosophy.quote")}
          </blockquote>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("philosophy.description")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        id="join"
        className="py-24 sm:py-32 bg-gradient-to-r from-blue-600 to-sky-500 text-white"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mt-4 text-lg text-blue-100">{t("cta.subtitle")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#donate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Heart className="h-4 w-4" />
              {t("cta.donate")}
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {t("cta.become_ambassador")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {t("cta.partner")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
