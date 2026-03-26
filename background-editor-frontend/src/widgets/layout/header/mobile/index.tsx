'use client';

import { mdiClose, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@shared/components/buttons';
import Dropdown from '@shared/components/dropdown';
import Logo from '@shared/components/logo';
import { MobileProfilePreview } from '@shared/components/profile-preview/mobile-profile-preview';
import { EModalKeys } from '@shared/utils/enums';
import { useDisableBodyScroll } from '@shared/utils/hooks/use-disable-body-scroll';
import useHeaderLogic from '@widgets/layout/header/base';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import HeaderAccordion from '@shared/components/accordion/header';
import useGetMePresenter from '@entities/cases/profile/get-me/presenter';

const MobileHeader = () => {
  const { data: user } = useGetMePresenter();

  const { isAuthenticated, handleLogout, openModal, t, selectedLanguage, languageOptions, usageOptions } =
    useHeaderLogic();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useDisableBodyScroll(isMenuOpen);

  return (
    <header className="header-base">
      <Logo />
      <div className="menu-button">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={'z-999'}>
          <Icon path={isMenuOpen ? mdiClose : mdiMenu} className={'text-icon'} size={'32px'} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="menu-wrapper">
          <div className="flex h-full flex-col gap-[24px]">
            <div className="flex h-[72px] w-full" />
            <div className={'flex h-full flex-col gap-[32px] overflow-scroll'}>
              {isAuthenticated && (
                <MobileProfilePreview
                  name={user?.name ?? ''}
                  avatarUrl={user?.avatar ?? '/assets/avatar.png'}
                  onClick={() => {
                    router.push('/profile');
                    setIsMenuOpen(false);
                  }}
                />
              )}

              <nav className="flex flex-col gap-[24px]">
                <HeaderAccordion
                  title={t('applicationPossibilities')}
                  options={usageOptions.map((opt) => ({
                    ...opt,
                    onclick: () => {
                      router.push(opt.value);
                      setIsMenuOpen(!isMenuOpen);
                    }
                  }))}
                  label={t('applicationPossibilities')}
                />
                <Link href="#" className="body-18px-golos-medium">
                  {t('links.tariff')}
                </Link>
                <Link href="#" className="body-18px-golos-medium">
                  {t('links.article')}
                </Link>
                <Link href="#" className="body-18px-golos-medium">
                  {t('links.help')}
                </Link>
                <Link href="#" className="body-18px-golos-medium">
                  API
                </Link>
              </nav>

              <Dropdown options={languageOptions} label={selectedLanguage} isSelected position="left" />

              {isAuthenticated ? (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}>
                  {'Выйти'}
                </Button>
              ) : (
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      openModal(EModalKeys.MODAL_REGISTER);
                      setIsMenuOpen(false);
                    }}>
                    {t('buttons.register')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      openModal(EModalKeys.MODAL_LOGIN);
                      setIsMenuOpen(false);
                    }}>
                    {t('buttons.login')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(MobileHeader);
