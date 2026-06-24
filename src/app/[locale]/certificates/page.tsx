import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Award,
  Download,
  Share2,
  ShieldCheck,
  Calendar,
  FileCheck,
  GraduationCap,
  Users,
  Trophy,
} from "lucide-react";

const CERTIFICATES = [
  {
    id: "CERT-EDN-2026-001",
    type: "type_training",
    title: "Entrepreneuriat et Business Plan",
    issuedDate: "2026-05-15",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "CERT-EDN-2026-002",
    type: "type_ambassador",
    title: "Ambassadeur Élite EDENLIFE 2026",
    issuedDate: "2026-01-01",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "CERT-EDN-2025-015",
    type: "type_participation",
    title: "Marathon de la Solidarité 2025",
    issuedDate: "2025-09-10",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "CERT-EDN-2025-008",
    type: "type_achievement",
    title: "Top 10 Ambassadeurs — Année 2025",
    issuedDate: "2025-12-31",
    icon: Award,
    color: "from-amber-500 to-orange-500",
  },
];

export default function CertificatesPage() {
  const t = useTranslations("certificates");

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Award className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        {/* Certificates Grid */}
        <div className="space-y-4">
          {CERTIFICATES.map((cert) => {
            const Icon = cert.icon;
            return (
              <div key={cert.id} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  {/* Left color strip + icon */}
                  <div className={`sm:w-32 h-24 sm:h-auto bg-gradient-to-br ${cert.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 rounded-full px-2.5 py-0.5">
                          {t(cert.type)}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold">{cert.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {t("issued")} {new Date(cert.issuedDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            {cert.id}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 shrink-0">
                        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
                          <Download className="h-4 w-4" />
                          {t("download")}
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <ShieldCheck className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Preview */}
        <div className="mt-12 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 p-8">
          <div className="text-center">
            <div className="inline-block rounded-xl bg-white dark:bg-gray-900 px-6 py-4 shadow-lg mb-4 border border-gray-200 dark:border-gray-800">
              <Image src="/logo-edenlife.png" alt="EDENLIFE" width={160} height={48} className="h-10 w-auto mx-auto mb-3" />
              <p className="text-xs text-gray-400 uppercase tracking-widest">Certificat de Formation</p>
              <p className="text-lg font-bold mt-1">JeHoPa KING</p>
              <p className="text-sm text-gray-500 mt-1">Entrepreneuriat et Business Plan</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Vérifié — CERT-EDN-2026-001
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {t("earn_certificate")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
