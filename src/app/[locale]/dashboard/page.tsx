"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { signOut } from "@/lib/supabase/auth";
import {
  User, Heart, Calendar, FolderOpen, Settings, LogOut, QrCode, IdCard, Trophy, Star, Clock, ChevronRight, Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </section>
    );
  }

  const displayName = profile
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || user.email
    : user.email;
  const initials = profile
    ? `${(profile.first_name as string)?.[0] || ""}${(profile.last_name as string)?.[0] || ""}`.toUpperCase()
    : (user.email?.[0] || "U").toUpperCase();
  const userType = (profile?.user_type as string) || "member";
  const badge = (profile?.badge as string) || "bronze";
  const points = (profile?.points as number) || 0;

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  const menuItems = [
    { icon: User, label: t("my_profile"), href: "#" },
    { icon: Heart, label: t("my_donations"), href: "#" },
    { icon: Calendar, label: t("my_events"), href: "#" },
    { icon: FolderOpen, label: t("my_projects"), href: "#" },
    { icon: Settings, label: t("settings"), href: "#" },
  ];

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t("welcome")}, {displayName}</h1>
              <p className="mt-1 text-blue-100 capitalize">{userType} — {badge}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4" /> {points} {t("points")}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {t("member_since")} {new Date(user.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-3xl font-bold text-blue-600">
                  {initials}
                </div>
                <h2 className="mt-3 text-lg font-semibold">{displayName}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="mt-2 inline-block rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-0.5 text-xs font-medium">
                  {t("active")}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <QrCode className="h-3.5 w-3.5" /> {t("qr_code")}
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <IdCard className="h-3.5 w-3.5" /> {t("digital_id")}
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
              {menuItems.map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors">
                  <item.icon className="h-4 w-4 text-gray-400" />
                  {item.label}
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-300" />
                </a>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut className="h-4 w-4" />
                {t("logout")}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: t("my_donations"), value: "$0", color: "text-green-600" },
                { label: t("my_events"), value: "0", color: "text-blue-600" },
                { label: t("my_projects"), value: "0", color: "text-purple-600" },
                { label: t("points"), value: String(points), color: "text-amber-600" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">{t("recent_activity")}</h3>
              <p className="text-sm text-gray-500">{t("no_activity")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
