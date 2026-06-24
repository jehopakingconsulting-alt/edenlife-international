"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import {
  Mail, Lock, User, Phone, MapPin, Globe, ArrowRight, Users, Loader2, AlertCircle, CheckCircle2,
} from "lucide-react";
import { signUp, signInWithGoogle, signInWithFacebook } from "@/lib/supabase/auth";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", city: "", country: "", user_type: "ambassador", password: "", confirm_password: "", terms: false,
  });

  function update(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    if (!form.terms) {
      setError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, {
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      city: form.city,
      country: form.country,
      user_type: form.user_type,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  const userTypes = [
    { value: "ambassador", label: t("type_ambassador") },
    { value: "pastor", label: t("type_pastor") },
    { value: "member", label: t("type_member") },
    { value: "collaborator", label: t("type_collaborator") },
    { value: "partner", label: t("type_partner") },
  ];

  if (success) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-6">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">Inscription réussie !</h1>
          <p className="mt-2 text-gray-500">
            Un email de confirmation a été envoyé à <strong>{form.email}</strong>. Vérifiez votre boîte de réception pour activer votre compte.
          </p>
          <Link href="/login" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            {t("login_btn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-block rounded-xl bg-white dark:bg-gray-900 px-4 py-2 shadow-sm mb-4">
            <Image src="/logo-edenlife.png" alt="EDENLIFE International" width={160} height={48} className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-bold">{t("register_title")}</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{t("register_subtitle")}</p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-8">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("first_name")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("last_name")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" placeholder="email@exemple.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("phone")}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" placeholder="+1 514-000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("city")}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("country")}</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("user_type")}</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select value={form.user_type} onChange={(e) => update("user_type", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition appearance-none">
                  {userTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" placeholder="••••••••" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("confirm_password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="password" required value={form.confirm_password} onChange={(e) => update("confirm_password", e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} className="mt-1 rounded border-gray-300" />
              <span className="text-xs text-gray-500">
                {t("terms_agree")} <a href="#" className="text-blue-600 hover:underline">{t("terms")}</a> {t("and")} <a href="#" className="text-blue-600 hover:underline">{t("privacy")}</a>
              </span>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t("register_btn")} <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-gray-900 px-3 text-gray-500">{t("or_continue")}</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => signInWithGoogle()} className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {t("google")}
              </button>
              <button onClick={() => signInWithFacebook()} className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {t("facebook")}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          {t("has_account")}{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">{t("login_btn")}</Link>
        </p>
      </div>
    </section>
  );
}
