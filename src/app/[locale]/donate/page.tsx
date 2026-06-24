"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Heart,
  CreditCard,
  Lock,
  GraduationCap,
  Stethoscope,
  Briefcase,
  TrendingUp,
  MessageSquare,
  EyeOff,
  FileText,
  Sparkles,
  Users,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const AMOUNTS = [10, 25, 50, 100, 250, 500];

export default function DonatePage() {
  const t = useTranslations("donate");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [fund, setFund] = useState("general");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [receipt, setReceipt] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activeAmount = selectedAmount ?? (Number(customAmount) || 0);

  // Check URL params for success/cancelled
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true" && !success) {
      setSuccess(true);
    }
  }

  async function handleDonate() {
    if (activeAmount < 1) return;
    setLoading(true);

    const res = await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: activeAmount,
        currency: "cad",
        frequency,
        fund,
        anonymous,
        message,
        receipt,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <Heart className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Frequency */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-6">
                <button
                  onClick={() => setFrequency("once")}
                  className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition-colors ${
                    frequency === "once"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {t("one_time")}
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition-colors ${
                    frequency === "monthly"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {t("monthly")}
                </button>
              </div>

              {/* Amount Selection */}
              <label className="block text-sm font-medium mb-3">
                {t("amount")} (CAD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-lg py-3 text-sm font-semibold border-2 transition-colors ${
                      selectedAmount === amount
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  placeholder={t("custom_amount")}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-8 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>

            {/* Fund Allocation */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <label className="block text-sm font-medium mb-3">
                {t("allocate")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { key: "general", icon: Heart },
                  { key: "education_fund", icon: GraduationCap },
                  { key: "health_fund", icon: Stethoscope },
                  { key: "training_fund", icon: Briefcase },
                  { key: "development_fund", icon: TrendingUp },
                ].map(({ key, icon: Icon }) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 cursor-pointer hover:border-blue-300 transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20"
                  >
                    <input
                      type="radio"
                      name="fund"
                      checked={fund === key}
                      onChange={() => setFund(key)}
                      className="accent-blue-600"
                    />
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{t(key)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <label className="block text-sm font-medium mb-3">
                {t("payment_method")}
              </label>
              <div className="flex gap-2 mb-6">
                {[
                  { id: "stripe", label: t("stripe"), color: "bg-indigo-600" },
                  { id: "paypal", label: t("paypal"), color: "bg-yellow-500" },
                  { id: "moncash", label: t("moncash"), color: "bg-red-500" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium border-2 transition-colors ${
                      paymentMethod === method.id
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              {paymentMethod === "stripe" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {t("name_on_card")}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {t("card_number")}
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        {t("expiry")}
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        {t("cvc")}
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-3">
                    <span className="text-2xl font-bold">P</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Vous serez redirigé vers PayPal
                  </p>
                </div>
              )}

              {paymentMethod === "moncash" && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-3">
                    <span className="text-2xl font-bold">M</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Vous serez redirigé vers MonCash
                  </p>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  <MessageSquare className="inline h-4 w-4 mr-1 text-gray-400" />
                  {t("message")}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="accent-blue-600 rounded" />
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  {t("anonymous")}
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={receipt} onChange={(e) => setReceipt(e.target.checked)} className="accent-blue-600 rounded" />
                  <FileText className="h-4 w-4 text-gray-400" />
                  {t("receipt")}
                </label>
              </div>
            </div>

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {t("thank_you")}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleDonate}
              disabled={loading || activeAmount < 1}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  {t("donate_btn")} — ${activeAmount}{" "}
                  {frequency === "monthly" ? "/ mois" : ""}
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" /> {t("secure")}
            </p>
          </div>

          {/* Sidebar — Impact + Recent Donors */}
          <div className="lg:col-span-1 space-y-6">
            {/* Impact */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                {t("impact_title")}
              </h3>
              <div className="space-y-4">
                {[
                  { amount: "$10", text: t("impact_1"), color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
                  { amount: "$25", text: t("impact_2"), color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
                  { amount: "$100", text: t("impact_3"), color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
                  { amount: "$500", text: t("impact_4"), color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
                ].map((item) => (
                  <div key={item.amount} className="flex items-start gap-3">
                    <span
                      className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${item.color}`}
                    >
                      {item.amount}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Donors */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Users className="h-5 w-5 text-blue-500" />
                {t("recent_donors")}
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Marie L.", amount: "$100", time: "2h" },
                  { name: t("anonymous_donor"), amount: "$250", time: "5h" },
                  { name: "Pierre K.", amount: "$50", time: "8h" },
                  { name: "Sophie M.", amount: "$25", time: "12h" },
                  { name: t("anonymous_donor"), amount: "$500", time: "1j" },
                ].map((donor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600">
                        {donor.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{donor.name}</p>
                        <p className="text-xs text-gray-400">{donor.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {donor.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-6 text-center text-white">
              <div className="inline-block rounded-xl bg-white px-4 py-2 mb-3">
                <Image
                  src="/logo-edenlife.png"
                  alt="EDENLIFE International"
                  width={140}
                  height={42}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm font-medium text-blue-100">
                {t("thank_you")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
