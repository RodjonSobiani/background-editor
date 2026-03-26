import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale ?? '')) notFound();
  return {
    messages: (await import(`@public/locales/${locale}.json`)).default,
    locale
  };
});
