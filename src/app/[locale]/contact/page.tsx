import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  Handshake,
  ArrowRight,
  Globe,
} from "lucide-react";

const PARTNERS = [
  { name: "ASPAG", desc: "Association de solidarité" },
  { name: "ECC", desc: "Éditions Cri du Coeur" },
  { name: "CGM", desc: "Centre de Gestion Moderne" },
  { name: "AIDP", desc: "Agence de développement" },
  { name: "Live to Share", desc: "Vivre pour partager" },
  { name: "Diaspora Global Media", desc: "Média diaspora" },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Mail className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("first_name")}</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("last_name")}</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("email")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("phone")}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="tel" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("subject")}</label>
                <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("message")}</label>
                <textarea rows={5} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                <Send className="h-4 w-4" />
                {t("send")}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                {t("info")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t("address")}</p>
                    <p className="text-sm text-gray-500">{t("address_value")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Canada</p>
                    <p className="text-sm text-gray-500">{t("phone_ca")}</p>
                    <p className="text-sm font-medium mt-1">Haïti</p>
                    <p className="text-sm text-gray-500">{t("phone_ht")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t("email")}</p>
                    <p className="text-sm text-gray-500">{t("email_value")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t("hours")}</p>
                    <p className="text-sm text-gray-500">{t("hours_value")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 h-48">
              <Image
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=80"
                alt="Montréal"
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {t("partners_title")}
            </span>
            <h2 className="mt-3 text-2xl font-bold">{t("partners_subtitle")}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg font-bold text-blue-600 mb-3">
                  {p.name[0]}
                </div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Become Partner CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-center text-white">
          <Handshake className="mx-auto h-10 w-10 mb-4" />
          <h2 className="text-2xl font-bold">{t("become_partner")}</h2>
          <p className="mt-2 text-blue-100 max-w-lg mx-auto">{t("partner_desc")}</p>
          <a href="/register" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors">
            {t("become_partner")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
