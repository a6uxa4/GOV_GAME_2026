import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Locale } from "next-intl";

const locales = ["en", "ru"];

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const resolvedLocale = locale ?? (await requestLocale);

  if (!resolvedLocale) notFound();
  if (!locales.includes(resolvedLocale as Locale)) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`../locales/${resolvedLocale}.json`)).default,
  };
});
