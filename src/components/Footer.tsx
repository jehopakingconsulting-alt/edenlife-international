import { useTranslations } from "next-intl";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="inline-block rounded-lg bg-white px-4 py-2">
              <Image
                src="/logo-edenlife.png"
                alt="EDENLIFE International"
                width={180}
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-sm italic text-blue-400 font-medium">
              {t("slogan")}
            </p>
            <p className="mt-3 text-sm text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t("quick_links")}
            </h3>
            <ul className="mt-4 space-y-2">
              {["home", "about", "projects", "ambassadors", "blog", "events"].map(
                (key) => (
                  <li key={key}>
                    <a
                      href="#"
                      className="text-sm hover:text-blue-400 transition-colors"
                    >
                      {nav(key)}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t("contact_us")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-400" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-blue-400" />
                +1 514-322-3762
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                contact@edenlifeintl.org
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t("follow_us")}
            </h3>
            <div className="mt-4 flex gap-3">
              {["facebook", "instagram", "youtube"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors text-xs font-bold uppercase"
                >
                  {name[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EDENLIFE International. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
