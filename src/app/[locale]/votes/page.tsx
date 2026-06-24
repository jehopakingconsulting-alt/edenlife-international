"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Vote,
  Clock,
  Users,
  CheckCircle2,
  BarChart3,
  Timer,
} from "lucide-react";

const POLLS = [
  {
    id: 1,
    question: "Quel domaine devrait être prioritaire pour EDENLIFE en 2027 ?",
    options: [
      { label: "Éducation", votes: 342, pct: 38 },
      { label: "Santé", votes: 256, pct: 28 },
      { label: "Formation professionnelle", votes: 198, pct: 22 },
      { label: "Développement économique", votes: 108, pct: 12 },
    ],
    totalVotes: 904,
    endsIn: 5,
    status: "active",
    voted: false,
  },
  {
    id: 2,
    question: "Dans quel pays EDENLIFE devrait ouvrir sa prochaine antenne ?",
    options: [
      { label: "République Dominicaine", votes: 189, pct: 32 },
      { label: "Sénégal", votes: 167, pct: 28 },
      { label: "Colombie", votes: 145, pct: 24 },
      { label: "Cameroun", votes: 95, pct: 16 },
    ],
    totalVotes: 596,
    endsIn: 12,
    status: "active",
    voted: false,
  },
  {
    id: 3,
    question: "Quel format de formation préférez-vous ?",
    options: [
      { label: "En ligne (Zoom)", votes: 445, pct: 45 },
      { label: "En présentiel", votes: 298, pct: 30 },
      { label: "Hybride", votes: 248, pct: 25 },
    ],
    totalVotes: 991,
    endsIn: 0,
    status: "closed",
    voted: true,
  },
  {
    id: 4,
    question: "Souhaitez-vous un Marathon EDENLIFE annuel ?",
    options: [
      { label: "Oui, absolument !", votes: 678, pct: 82 },
      { label: "Non, pas nécessaire", votes: 149, pct: 18 },
    ],
    totalVotes: 827,
    endsIn: 0,
    status: "closed",
    voted: true,
  },
];

const BAR_COLORS = ["bg-blue-500", "bg-green-500", "bg-amber-500", "bg-purple-500"];

export default function VotesPage() {
  const t = useTranslations("votes");
  const [filter, setFilter] = useState<"active" | "closed">("active");
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});

  const filtered = POLLS.filter((p) => p.status === filter);

  function handleVote(pollId: number, optionIdx: number) {
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionIdx }));
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <BarChart3 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1">
            {(["active", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === f ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Polls */}
        <div className="space-y-6">
          {filtered.map((poll) => {
            const hasVoted = poll.voted || votedPolls[poll.id] !== undefined;
            const votedIdx = votedPolls[poll.id];
            return (
              <div key={poll.id} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold flex-1">{poll.question}</h3>
                  {poll.status === "active" && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 dark:bg-amber-900/30 rounded-full px-2.5 py-1 shrink-0 ml-3">
                      <Timer className="h-3 w-3" /> {poll.endsIn} {t("days")}
                    </span>
                  )}
                  {poll.status === "closed" && (
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-1 shrink-0 ml-3">
                      {t("ended")}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {poll.options.map((opt, i) => (
                    <div key={i}>
                      {hasVoted || poll.status === "closed" ? (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className={`font-medium ${votedIdx === i ? "text-blue-600" : ""}`}>
                              {votedIdx === i && <CheckCircle2 className="inline h-4 w-4 mr-1" />}
                              {opt.label}
                            </span>
                            <span className="text-gray-500">{opt.pct}%</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-500`} style={{ width: `${opt.pct}%` }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{opt.votes} {t("votes_count")}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleVote(poll.id, i)}
                          className="w-full text-left rounded-lg border-2 border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-medium hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          {opt.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {poll.totalVotes} {t("participants")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
