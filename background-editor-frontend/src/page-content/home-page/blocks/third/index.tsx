import React from 'react';
import { useTranslations } from 'next-intl';
import { APP_LINKS } from '@shared/const/links';
import BigLink from '@shared/components/big-link';

export const ThirdBlock = () => {
  const t = useTranslations();
  return (
    <div className="third-block">
      <div className={'space-y-6'}>
        <h2 className={'title'}>{t('homePage.thirdBlock.title')}</h2>
        <h3 className={'subtitle'}>{t('homePage.thirdBlock.subtitle')}</h3>
      </div>
      <div className={'big-links-container'}>
        {APP_LINKS.map((link, index) => (
          <BigLink
            key={link.href}
            href={link.href}
            number={`0${index + 1}`}
            title={t(`header.${link.dropdownLabel}`)}
          />
        ))}
      </div>
    </div>
  );
};
