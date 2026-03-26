'use client';

import { useCallback, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useModals } from '@shared/providers/client/modal-provider';
import { useAuth } from '@shared/providers/client/auth-provider';
import { AuthService } from '@shared/api/auth.service';
import { IDropdownOption } from '@shared/interfaces/ui/dropdown';
import { APP_LINKS } from '@shared/const/links';

const useHeaderLogic = () => {
  const { isAuthenticated, logout } = useAuth();
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModals();

  const handleLogout = () => {
    AuthService.logout(logout);
  };

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      const pathSegments = pathname.split('/').filter(Boolean);
      const newPath = pathSegments.slice(1).join('/');
      router.push(`/${newLocale}/${newPath}?${searchParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const languageOptions: IDropdownOption[] = useMemo(
    () => [
      { label: 'Русский', value: 'ru', onClick: () => handleLanguageChange('ru') },
      { label: 'English', value: 'en', onClick: () => handleLanguageChange('en') }
    ],
    [handleLanguageChange]
  );

  const selectedLanguage = (languageOptions.find((opt) => opt.value === locale)?.label ?? 'Русский') as string;

  const usageOptions = APP_LINKS.map((link) => ({
    label: t(link.dropdownLabel),
    value: link.href,
    href: link.href
  }));

  return {
    isAuthenticated,
    handleLogout,
    openModal,
    t,
    selectedLanguage,
    languageOptions,
    usageOptions
  };
};

export default useHeaderLogic;
