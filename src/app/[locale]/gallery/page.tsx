"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Camera, Eye, X } from "lucide-react";

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", cat: "missions", alt: "Mission humanitaire" },
  { id: 2, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", cat: "training_cat", alt: "Formation éducative" },
  { id: 3, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", cat: "events_cat", alt: "Gala annuel" },
  { id: 4, src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80", cat: "community", alt: "Communauté solidaire" },
  { id: 5, src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", cat: "missions", alt: "Programme santé" },
  { id: 6, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", cat: "training_cat", alt: "Atelier entrepreneuriat" },
  { id: 7, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", cat: "events_cat", alt: "Soirée de collecte" },
  { id: 8, src: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&q=80", cat: "community", alt: "Couture artisanale" },
  { id: 9, src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80", cat: "missions", alt: "Distribution alimentaire" },
  { id: 10, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", cat: "training_cat", alt: "Réunion stratégique" },
  { id: 11, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80", cat: "events_cat", alt: "Conférence internationale" },
  { id: 12, src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", cat: "community", alt: "Jeunesse engagée" },
];

type Cat = "all" | "events_cat" | "training_cat" | "missions" | "community";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [cat, setCat] = useState<Cat>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = cat === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 overflow-x-auto">
            {(["all", "events_cat", "training_cat", "missions", "community"] as Cat[]).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  cat === c
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(c)}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(photo.src)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={i % 3 === 0 ? 450 : i % 3 === 1 ? 350 : 400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <Image
            src={lightbox.replace("w=800", "w=1400")}
            alt=""
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
