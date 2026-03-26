'use client';

import { Button } from '@shared/components/buttons';
import Dropdown from '@shared/components/dropdown';
import Logo from '@shared/components/logo';
import { ProfileDropdownMenu } from '@shared/components/profile-preview/profile-dropdown-menu';
import { EModalKeys } from '@shared/utils/enums';
import useHeaderLogic from '@widgets/layout/header/base';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import useGetMePresenter from '@entities/cases/profile/get-me/presenter';

const DesktopHeader = () => {
  const router = useRouter();

  const { data: user } = useGetMePresenter();

  const { isAuthenticated, openModal, t, selectedLanguage, languageOptions, usageOptions } = useHeaderLogic();

  return (
    <header className="header-base">
      <nav className="flex items-center gap-16">
        <Logo />
        <div className="flex items-center gap-8">
          <Dropdown
            options={usageOptions}
            label={t('applicationPossibilities')}
            onSelect={(value) => router.push(value)}
          />
          <Link href="#">{t('links.tariff')}</Link>
          <Link href="#">{t('links.article')}</Link>
          <Link href="#">{t('links.help')}</Link>
          <Link href="#">API</Link>
        </div>
      </nav>
      <div className="flex items-center gap-4">
        <Dropdown options={languageOptions} label={selectedLanguage} isSelected position="center" />
        {isAuthenticated ? (
          <ProfileDropdownMenu name={user?.name ?? ''} avatarUrl={user?.avatar ?? '/assets/avatar.png'} />
        ) : (
          <>
            <Button onClick={() => openModal(EModalKeys.MODAL_REGISTER)}>{t('buttons.register')}</Button>
            <Button variant="secondary" onClick={() => openModal(EModalKeys.MODAL_LOGIN)}>
              {t('buttons.login')}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default React.memo(DesktopHeader);
