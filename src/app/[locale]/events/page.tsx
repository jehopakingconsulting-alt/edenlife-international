"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Video,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";

const EVENTS = [
  {
    id: 1,
    titleKey: "Gala Annuel EDENLIFE 2026",
    date: "2026-08-15",
    time: "18:00",
    location: "Montréal, Canada",
    type: "in_person",
    category: "gala",
    price: "$75",
    spots: 42,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: 2,
    titleKey: "Conférence Éducation & Innovation",
    date: "2026-07-20",
    time: "10:00",
    location: "Zoom",
    type: "online",
    category: "conference",
    price: null,
    spots: 200,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    id: 3,
    titleKey: "Marathon de la Solidarité",
    date: "2026-09-05",
    time: "07:00",
    location: "Port-au-Prince, Haïti",
    type: "in_person",
    category: "marathon",
    price: "$25",
    spots: 15,
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80",
  },
  {
    id: 4,
    titleKey: "Formation Entrepreneuriat Digital",
    date: "2026-07-10",
    time: "14:00",
    location: "Zoom",
    type: "online",
    category: "training_event",
    price: null,
    spots: 80,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
  },
  {
    id: 5,
    titleKey: "Soirée de Collecte de Fonds",
    date: "2026-10-12",
    time: "19:00",
    location: "Miami, USA",
    type: "in_person",
    category: "fundraiser",
    price: "$100",
    spots: 0,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
  },
  {
    id: 6,
    titleKey: "Webinaire Santé Communautaire",
    date: "2026-08-01",
    time: "11:00",
    location: "Zoom",
    type: "online",
    category: "conference",
    price: null,
    spots: 150,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
];

type FilterType = "all" | "upcoming" | "past";

export default function EventsPage() {
  const t = useTranslations("events");
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const now = new Date().toISOString().split("T")[0];
  const filtered = EVENTS.filter((e) => {
    if (filter === "upcoming" && e.date < now) return false;
    if (filter === "past" && e.date >= now) return false;
    if (search && !e.titleKey.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Calendar className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1">
            {(["all", "upcoming", "past"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Banner */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.titleKey}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                {/* Category + Type badges */}
                <div className="flex gap-2 mb-3">
                  <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2.5 py-0.5 text-xs font-medium">
                    {t(event.category)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      event.type === "online"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                    }`}
                  >
                    {event.type === "online" ? (
                      <span className="flex items-center gap-1">
                        <Video className="h-3 w-3" /> {t("online")}
                      </span>
                    ) : (
                      t("in_person")
                    )}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  {event.titleKey}
                </h3>

                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {event.location}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-blue-600">
                      {event.price ?? t("free")}
                    </span>
                    {event.spots > 0 && (
                      <p className="text-xs text-gray-400">
                        {event.spots} {t("spots_left")}
                      </p>
                    )}
                  </div>
                  <button
                    disabled={event.spots === 0}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      event.spots === 0
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Ticket className="h-4 w-4" />
                    {event.spots === 0 ? t("sold_out") : t("register")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
