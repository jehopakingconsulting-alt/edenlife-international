"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Play,
  Award,
  BarChart3,
  Star,
} from "lucide-react";

const COURSES = [
  {
    id: 1,
    title: "Entrepreneuriat et Business Plan",
    instructor: "JeHoPa KING",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    category: "business",
    level: "level_beginner",
    lessons: 12,
    hours: 6,
    students: 458,
    rating: 4.8,
    progress: 0,
  },
  {
    id: 2,
    title: "Marketing Digital pour ONG",
    instructor: "Sophie Martin",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    category: "tech",
    level: "level_intermediate",
    lessons: 8,
    hours: 4,
    students: 312,
    rating: 4.6,
    progress: 65,
  },
  {
    id: 3,
    title: "Santé Communautaire : Les Bases",
    instructor: "Dr. Marie Leclerc",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    category: "health",
    level: "level_beginner",
    lessons: 10,
    hours: 5,
    students: 289,
    rating: 4.9,
    progress: 100,
  },
  {
    id: 4,
    title: "Leadership et Gestion d'Équipe",
    instructor: "Pierre Joseph",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    category: "leadership",
    level: "level_advanced",
    lessons: 15,
    hours: 8,
    students: 176,
    rating: 4.7,
    progress: 30,
  },
  {
    id: 5,
    title: "Gestion Financière pour Entrepreneurs",
    instructor: "David Chen",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    category: "business",
    level: "level_intermediate",
    lessons: 14,
    hours: 7,
    students: 234,
    rating: 4.5,
    progress: 0,
  },
  {
    id: 6,
    title: "Introduction au Développement Web",
    instructor: "Fatima Diallo",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    category: "tech",
    level: "level_beginner",
    lessons: 20,
    hours: 12,
    students: 521,
    rating: 4.8,
    progress: 0,
  },
];

type Cat = "all" | "business" | "tech" | "health" | "leadership";

export default function ElearningPage() {
  const t = useTranslations("elearning");
  const [cat, setCat] = useState<Cat>("all");

  const filtered = cat === "all" ? COURSES : COURSES.filter((c) => c.category === cat);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">6</p>
            <p className="text-xs text-gray-500">{t("courses")}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">42h</p>
            <p className="text-xs text-gray-500">{t("hours")}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">1,990</p>
            <p className="text-xs text-gray-500">{t("students")}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 overflow-x-auto">
            {(["all", "business", "tech", "health", "leadership"] as Cat[]).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  cat === c ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(c)}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div key={course.id} className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-44 overflow-hidden">
                <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-full bg-green-500 text-white px-2.5 py-0.5 text-xs font-semibold">{t("free")}</span>
                  <span className="rounded-full bg-white/90 text-gray-700 px-2.5 py-0.5 text-xs font-medium">{t(course.level)}</span>
                </div>
                {course.progress === 0 && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-blue-600 ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2.5 py-0.5 text-xs font-medium">{t(course.category)}</span>
                  <span className="flex items-center gap-0.5 text-xs text-amber-500">
                    <Star className="h-3 w-3 fill-current" /> {course.rating}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>

                <p className="text-xs text-gray-500 mb-3">
                  {t("instructor")} : {course.instructor}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons} {t("lessons")}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.hours}h</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.students}</span>
                </div>

                {/* Progress */}
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{t("progress")}</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className={`h-full rounded-full ${course.progress >= 100 ? "bg-green-500" : "bg-blue-600"}`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}

                <button className={`w-full flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  course.progress >= 100
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                    : course.progress > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                  {course.progress >= 100 ? (
                    <><Award className="h-4 w-4" /> {t("certificate")}</>
                  ) : course.progress > 0 ? (
                    <><Play className="h-4 w-4" /> {t("continue")}</>
                  ) : (
                    <><Play className="h-4 w-4" /> {t("start_course")}</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
