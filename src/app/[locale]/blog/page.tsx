"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  ArrowRight,
  Star,
  Quote,
  User,
} from "lucide-react";

const POSTS = [
  {
    id: 1,
    title: "Comment EDENLIFE transforme l'éducation en Haïti",
    excerpt: "Découvrez comment nos programmes éducatifs ont permis à plus de 500 enfants d'accéder à une éducation de qualité dans les régions rurales d'Haïti.",
    author: "Marie Leclerc",
    date: "2026-06-20",
    readTime: 5,
    category: "news",
    likes: 124,
    comments: 18,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Témoignage : Ma vie a changé grâce à EDENLIFE",
    excerpt: "Pierre, ancien bénéficiaire de nos programmes de formation, partage son parcours inspirant vers l'entrepreneuriat.",
    author: "Pierre Joseph",
    date: "2026-06-15",
    readTime: 3,
    category: "testimonials",
    likes: 89,
    comments: 12,
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Lancement du programme Santé Communautaire 2026",
    excerpt: "Un nouveau programme ambitieux pour améliorer l'accès aux soins de santé dans 15 communautés ciblées.",
    author: "Dr. Sophie Martin",
    date: "2026-06-10",
    readTime: 4,
    category: "news",
    likes: 67,
    comments: 8,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "L'histoire de Roseline : de l'ombre à la lumière",
    excerpt: "Roseline raconte comment la formation professionnelle d'EDENLIFE lui a permis de lancer sa propre entreprise de couture.",
    author: "Roseline Blanc",
    date: "2026-06-05",
    readTime: 6,
    category: "stories",
    likes: 203,
    comments: 34,
    image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Bilan 2025 : Une année record pour EDENLIFE",
    excerpt: "Retour sur les réalisations majeures de l'année 2025, avec plus de 25 projets menés à bien dans 4 pays.",
    author: "JeHoPa KING",
    date: "2026-05-28",
    readTime: 7,
    category: "news",
    likes: 156,
    comments: 22,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "Témoignage : L'impact de la solidarité EDENLIFE",
    excerpt: "Jean-Marc, ambassadeur depuis 5 ans, partage comment son engagement a impacté sa communauté locale.",
    author: "Jean-Marc Dupont",
    date: "2026-05-20",
    readTime: 4,
    category: "testimonials",
    likes: 91,
    comments: 15,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    featured: false,
  },
];

type Category = "all_posts" | "news" | "testimonials" | "stories";

export default function BlogPage() {
  const t = useTranslations("blog");
  const [category, setCategory] = useState<Category>("all_posts");
  const [search, setSearch] = useState("");

  const filtered = POSTS.filter((p) => {
    if (category !== "all_posts" && p.category !== category) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const featured = POSTS.find((p) => p.featured);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured */}
        {featured && category === "all_posts" && !search && (
          <div className="mb-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden lg:flex group hover:shadow-lg transition-shadow">
            <div className="relative lg:w-2/5 h-48 lg:h-auto min-h-[200px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-0.5 text-xs font-semibold">
                  <Star className="h-3 w-3" /> {t("featured")}
                </span>
                <span className="text-xs text-gray-400">
                  {featured.readTime} {t("min_read")}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{featured.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600">
                    {featured.author[0]}
                  </div>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>
                    {new Date(featured.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  {t("read_more")} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 overflow-x-auto">
            {(["all_posts", "news", "testimonials", "stories"] as Category[]).map(
              (c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    category === c
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {t(c)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered
            .filter((p) => !p.featured || category !== "all_posts" || search)
            .map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2.5 py-0.5 text-xs font-medium">
                      {t(post.category)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" /> {post.readTime}{" "}
                      {t("min_read")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                      {post.author[0]}
                    </div>
                    <span className="text-xs text-gray-500">
                      {post.author} ·{" "}
                      {new Date(post.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="h-3.5 w-3.5" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-3.5 w-3.5" />{" "}
                        {post.comments}
                      </button>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="h-3.5 w-3.5" /> {t("share")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
