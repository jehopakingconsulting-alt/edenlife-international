import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FolderOpen,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Target,
  CheckCircle2,
  Timer,
} from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Éducation pour Tous — Haïti",
    desc: "Construction et équipement de 5 écoles dans les zones rurales d'Haïti pour garantir l'accès à l'éducation primaire.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
    location: "Haïti",
    beneficiaries: "2,500",
    duration: "2024-2026",
    goal: 150000,
    raised: 112500,
    status: "active",
  },
  {
    id: 2,
    title: "Cliniques Mobiles Santé",
    desc: "Déploiement de cliniques mobiles dans 15 communautés pour améliorer l'accès aux soins de santé de base.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    location: "Haïti, Canada",
    beneficiaries: "4,000",
    duration: "2025-2027",
    goal: 200000,
    raised: 85000,
    status: "active",
  },
  {
    id: 3,
    title: "Formation Entrepreneuriat Féminin",
    desc: "Programme de formation en entrepreneuriat pour 300 femmes, incluant mentorat et microfinancement.",
    image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&q=80",
    location: "Montréal, Port-au-Prince",
    beneficiaries: "300",
    duration: "2025-2026",
    goal: 80000,
    raised: 80000,
    status: "completed",
  },
  {
    id: 4,
    title: "Agriculture Durable & Sécurité Alimentaire",
    desc: "Mise en place de fermes communautaires et formation en techniques agricoles modernes pour assurer la sécurité alimentaire.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80",
    location: "Haïti",
    beneficiaries: "1,200",
    duration: "2024-2026",
    goal: 120000,
    raised: 95000,
    status: "active",
  },
  {
    id: 5,
    title: "Bibliothèques Numériques",
    desc: "Installation de centres numériques avec accès internet et ressources éducatives dans 10 communautés.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80",
    location: "Haïti, USA",
    beneficiaries: "5,000",
    duration: "2023-2025",
    goal: 100000,
    raised: 100000,
    status: "completed",
  },
  {
    id: 6,
    title: "Programme Sport & Jeunesse",
    desc: "Organisation d'activités sportives et culturelles pour la jeunesse, favorisant l'inclusion sociale et le leadership.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    location: "Montréal, Miami",
    beneficiaries: "800",
    duration: "2026-2027",
    goal: 60000,
    raised: 15000,
    status: "active",
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <FolderOpen className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => {
            const pct = Math.round((project.raised / project.goal) * 100);
            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {project.status === "active"
                      ? t("status_active")
                      : t("status_completed")}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {project.desc}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0 text-blue-500" />
                      {project.beneficiaries} {t("beneficiaries")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-blue-500" />
                      {project.duration}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-green-600">
                        ${project.raised.toLocaleString()}
                      </span>
                      <span className="text-gray-400">
                        {t("goal")}: ${project.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct >= 100 ? "bg-green-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{pct}%</p>
                  </div>

                  <button className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                    {t("learn_more")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call for Projects */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-center text-white">
          <Target className="mx-auto h-10 w-10 mb-4" />
          <h2 className="text-2xl font-bold">{t("call_title")}</h2>
          <p className="mt-2 text-blue-100 max-w-lg mx-auto">
            {t("call_subtitle")}
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors">
            {t("apply")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
