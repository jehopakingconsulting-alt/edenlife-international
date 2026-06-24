"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Trophy,
  Star,
  Medal,
  Crown,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const AMBASSADORS = [
  { id: 1, name: "JeHoPa KING", country: "Canada", points: 12500, badge: "elite", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", donations: 45, events: 28 },
  { id: 2, name: "Marie Leclerc", country: "Canada", points: 9800, badge: "elite", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", donations: 38, events: 22 },
  { id: 3, name: "Pierre Joseph", country: "Haïti", points: 8200, badge: "gold", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", donations: 30, events: 19 },
  { id: 4, name: "Sophie Martin", country: "France", points: 7500, badge: "gold", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", donations: 25, events: 17 },
  { id: 5, name: "Jean-Marc Dupont", country: "USA", points: 6100, badge: "gold", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", donations: 22, events: 14 },
  { id: 6, name: "Roseline Blanc", country: "Haïti", points: 5400, badge: "silver", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", donations: 18, events: 12 },
  { id: 7, name: "David Chen", country: "Canada", points: 4800, badge: "silver", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80", donations: 15, events: 10 },
  { id: 8, name: "Fatima Diallo", country: "France", points: 4200, badge: "silver", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", donations: 12, events: 9 },
  { id: 9, name: "Carlos Rivera", country: "USA", points: 3500, badge: "bronze", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", donations: 10, events: 7 },
  { id: 10, name: "Aminata Touré", country: "Haïti", points: 2900, badge: "bronze", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", donations: 8, events: 5 },
];

const BADGE_CONFIG: Record<string, { icon: typeof Crown; color: string; bg: string }> = {
  elite: { icon: Crown, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  gold: { icon: Trophy, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  silver: { icon: Medal, color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800" },
  bronze: { icon: Star, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
};

export default function AmbassadorsPage() {
  const t = useTranslations("ambassadors");
  const [period, setPeriod] = useState("all_time");

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Users className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-6 flex justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">2,500+</p>
              <p className="text-sm text-gray-500">{t("members")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">15+</p>
              <p className="text-sm text-gray-500">{t("country")}</p>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12 flex justify-center items-end gap-4">
          {[AMBASSADORS[1], AMBASSADORS[0], AMBASSADORS[2]].map((a, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const height = rank === 1 ? "h-40" : rank === 2 ? "h-32" : "h-24";
            const size = rank === 1 ? "h-20 w-20" : "h-16 w-16";
            const ringColor = rank === 1 ? "ring-amber-400" : rank === 2 ? "ring-gray-400" : "ring-orange-400";
            return (
              <div key={a.id} className="flex flex-col items-center">
                <div className={`relative ${size} rounded-full ring-4 ${ringColor} overflow-hidden mb-2`}>
                  <Image src={a.image} alt={a.name} fill className="object-cover" />
                </div>
                <p className="text-sm font-semibold text-center">{a.name}</p>
                <p className="text-xs text-gray-500">{a.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} pts</p>
                <div className={`mt-2 ${height} w-20 sm:w-28 rounded-t-xl bg-gradient-to-t ${
                  rank === 1 ? "from-amber-500 to-amber-300" : rank === 2 ? "from-gray-400 to-gray-300" : "from-orange-500 to-orange-300"
                } flex items-start justify-center pt-3`}>
                  <span className="text-2xl font-bold text-white">#{rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Period Filter */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1">
            {["this_week", "this_month", "all_time"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  period === p ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(p)}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              {t("leaderboard")}
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {AMBASSADORS.map((a, i) => {
              const badge = BADGE_CONFIG[a.badge];
              const BadgeIcon = badge.icon;
              return (
                <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <span className={`w-8 text-center text-lg font-bold ${i < 3 ? "text-amber-500" : "text-gray-400"}`}>
                    {i + 1}
                  </span>
                  <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                    <Image src={a.image} alt={a.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.country}</p>
                  </div>
                  <div className={`hidden sm:flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badge.bg} ${badge.color}`}>
                    <BadgeIcon className="h-3 w-3" />
                    {t(a.badge)}
                  </div>
                  <p className="text-sm font-bold text-blue-600 w-20 text-right">
                    {a.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Become Ambassador CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Sparkles className="h-10 w-10 mb-4" />
              <h2 className="text-2xl font-bold">{t("become")}</h2>
              <p className="mt-2 text-blue-100">{t("become_desc")}</p>
              <ul className="mt-6 space-y-3">
                {["benefit_1", "benefit_2", "benefit_3", "benefit_4"].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {t(b)}
                  </li>
                ))}
              </ul>
              <a
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
              >
                {t("join_now")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image
                src="/flag-edenlife.png"
                alt="EDENLIFE"
                width={400}
                height={400}
                className="w-[340px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
