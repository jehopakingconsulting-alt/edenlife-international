"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, Heart, Calendar, FileText, Settings, BarChart3, TrendingUp,
  DollarSign, UserPlus, FolderOpen, Mail, Search, Download, ChevronRight, Eye,
  CheckCircle2, XCircle, Clock, ArrowUpRight, ArrowDownRight, Loader2, Shield,
} from "lucide-react";

type Tab = "overview" | "users" | "donations" | "events" | "content" | "settings";

const MOCK_STATS = {
  totalUsers: 2547,
  totalDonations: 45280,
  totalEvents: 18,
  activeAmbassadors: 312,
  revenueMonth: 8450,
  newUsersMonth: 87,
  pendingProjects: 4,
  messagesUnread: 12,
};

const MOCK_USERS = [
  { id: 1, name: "Marie Leclerc", email: "marie@example.com", type: "ambassador", status: "active", date: "2026-06-20", points: 9800 },
  { id: 2, name: "Pierre Joseph", email: "pierre@example.com", type: "member", status: "active", date: "2026-06-19", points: 450 },
  { id: 3, name: "Sophie Martin", email: "sophie@example.com", type: "partner", status: "active", date: "2026-06-18", points: 7500 },
  { id: 4, name: "Jean-Marc Dupont", email: "jm@example.com", type: "ambassador", status: "inactive", date: "2026-06-15", points: 6100 },
  { id: 5, name: "Roseline Blanc", email: "roseline@example.com", type: "collaborator", status: "active", date: "2026-06-12", points: 5400 },
];

const MOCK_DONATIONS = [
  { id: 1, donor: "Marie Leclerc", amount: 250, fund: "Éducation", status: "completed", date: "2026-06-22" },
  { id: 2, donor: "Anonyme", amount: 500, fund: "Général", status: "completed", date: "2026-06-21" },
  { id: 3, donor: "Pierre Joseph", amount: 100, fund: "Santé", status: "completed", date: "2026-06-20" },
  { id: 4, donor: "Sophie Martin", amount: 75, fund: "Formation", status: "pending", date: "2026-06-19" },
  { id: 5, donor: "David Chen", amount: 1000, fund: "Développement", status: "completed", date: "2026-06-18" },
];

const MOCK_MESSAGES = [
  { id: 1, name: "Carlos Rivera", subject: "Partenariat", date: "2026-06-23", read: false },
  { id: 2, name: "Aminata Touré", subject: "Question sur les dons", date: "2026-06-22", read: false },
  { id: 3, name: "James Wilson", subject: "Devenir ambassadeur", date: "2026-06-21", read: true },
];

export default function AdminPage() {
  const t = useTranslations("admin");
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </section>
    );
  }

  const tabs: { key: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { key: "overview", icon: LayoutDashboard, label: t("overview") },
    { key: "users", icon: Users, label: t("users") },
    { key: "donations", icon: Heart, label: t("donations_mgmt") },
    { key: "events", icon: Calendar, label: t("events_mgmt") },
    { key: "content", icon: FileText, label: t("content") },
    { key: "settings", icon: Settings, label: t("settings_admin") },
  ];

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t("title")}</h1>
              <p className="text-sm text-gray-500">EDENLIFE International</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Download className="h-4 w-4" /> {t("export")}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t("total_users"), value: MOCK_STATS.totalUsers.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", trend: "+12%", up: true },
                { label: t("total_donations"), value: `$${MOCK_STATS.totalDonations.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", trend: "+23%", up: true },
                { label: t("active_ambassadors"), value: MOCK_STATS.activeAmbassadors.toString(), icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", trend: "+8%", up: true },
                { label: t("revenue_month"), value: `$${MOCK_STATS.revenueMonth.toLocaleString()}`, icon: BarChart3, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30", trend: "-5%", up: false },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-10 w-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                      {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t("new_users_month"), value: MOCK_STATS.newUsersMonth, icon: UserPlus, color: "text-blue-500" },
                { label: t("total_events"), value: MOCK_STATS.totalEvents, icon: Calendar, color: "text-green-500" },
                { label: t("pending_projects"), value: MOCK_STATS.pendingProjects, icon: FolderOpen, color: "text-amber-500" },
                { label: t("messages_unread"), value: MOCK_STATS.messagesUnread, icon: Mail, color: "text-red-500" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Donations */}
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold">{t("recent_donations")}</h3>
                  <button className="text-xs text-blue-600 font-medium">{t("view_all")}</button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {MOCK_DONATIONS.slice(0, 4).map((d) => (
                    <div key={d.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-medium">{d.donor}</p>
                        <p className="text-xs text-gray-500">{d.fund} · {d.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">${d.amount}</p>
                        <span className={`text-xs ${d.status === "completed" ? "text-green-500" : "text-amber-500"}`}>
                          {d.status === "completed" ? "✓" : "⏳"} {d.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unread Messages */}
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold">{t("messages_unread")}</h3>
                  <button className="text-xs text-blue-600 font-medium">{t("view_all")}</button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {MOCK_MESSAGES.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${m.read ? "bg-gray-300" : "bg-blue-600"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.name}</p>
                        <p className="text-xs text-gray-500 truncate">{m.subject}</p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("name")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("email")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("type")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("status")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Points</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {MOCK_USERS.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase())).map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-5 py-3 font-medium">{u.name}</td>
                      <td className="px-5 py-3 text-gray-500">{u.email}</td>
                      <td className="px-5 py-3"><span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 text-xs font-medium capitalize">{u.type}</span></td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${u.status === "active" ? "text-green-600" : "text-gray-400"}`}>
                          {u.status === "active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium">{u.points}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><Eye className="h-4 w-4 text-gray-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {tab === "donations" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("name")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("amount")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Fonds</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("status")}</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">{t("date")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {MOCK_DONATIONS.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-5 py-3 font-medium">{d.donor}</td>
                      <td className="px-5 py-3 font-bold text-green-600">${d.amount}</td>
                      <td className="px-5 py-3"><span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 text-xs">{d.fund}</span></td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${d.status === "completed" ? "text-green-600" : "text-amber-500"}`}>
                          {d.status === "completed" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {d.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {tab === "events" && (
          <div className="text-center py-16">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{t("events_mgmt")}</h3>
            <p className="text-sm text-gray-500 mt-1">Gestion des événements — CRUD complet à venir</p>
          </div>
        )}

        {/* Content Tab */}
        {tab === "content" && (
          <div className="text-center py-16">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{t("content")}</h3>
            <p className="text-sm text-gray-500 mt-1">Gestion du blog, galerie et projets — CRUD complet à venir</p>
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && (
          <div className="text-center py-16">
            <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{t("settings_admin")}</h3>
            <p className="text-sm text-gray-500 mt-1">Configuration de la plateforme — à venir</p>
          </div>
        )}
      </div>
    </section>
  );
}
