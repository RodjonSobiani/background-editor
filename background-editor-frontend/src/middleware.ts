import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@shared/const/locale';
import { ECookieValues } from '@shared/utils/enums';

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const preferredLocale = request.cookies.get(ECookieValues.NEXT_LOCALE)?.value;
  const response = intlMiddleware(request);
  if (!preferredLocale) {
    response.cookies.set(ECookieValues.NEXT_LOCALE, DEFAULT_LOCALE, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next_vercel|.*\\..*).*)']
};
