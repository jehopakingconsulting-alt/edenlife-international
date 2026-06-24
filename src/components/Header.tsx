"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home"), isRoute: true },
    { href: "/projects", label: t("projects"), isRoute: true },
    { href: "/blog", label: t("blog"), isRoute: true },
    { href: "/events", label: t("events"), isRoute: true },
    { href: "/gallery", label: t("gallery"), isRoute: true },
    { href: "/contact", label: t("contact"), isRoute: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-edenlife.png"
              alt="EDENLIFE International"
              width={180}
              height={54}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              {t("login")}
            </Link>
            <a
              href="/donate"
              className="hidden sm:inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {t("donate")}
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
            {links.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {link.label}
                </a>
              )
            )}
            <div className="flex gap-3 pt-2 px-3">
              <Link href="/login" className="text-sm font-medium text-blue-600">
                {t("login")}
              </Link>
              <Link href="/register" className="text-sm font-medium text-blue-600">
                {t("register")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
