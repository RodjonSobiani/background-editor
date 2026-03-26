'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';
import { ArticleCard } from '@page-content/home-page/blocks/fifth/ui/article-card';
import useMobile from '@shared/utils/mobile-detector';

export const FifthBlock = () => {
  const t = useTranslations('homePage.fifthBlock');
  const isMobile = useMobile(769);
  const [isShowMore, setIsShowMore] = useState(false);

  const articles = useMemo(() => {
    let slice = 4;
    if (isMobile) {
      slice = 2;
    }
    return Array(10)
      .fill(0)
      .map((_, i) => <ArticleCard key={i} />)
      .slice(0, isShowMore ? undefined : slice);
  }, [isMobile, isShowMore]);

  return (
    <div className="fifth-block">
      <div className={'space-y-6'}>
        <h2 className={'title'}>{t('title')}</h2>
        <h3 className={'subtitle'}>{t('subtitle')}</h3>
      </div>
      <div className={'content'}>{articles}</div>
      {!isShowMore && (
        <Button variant={'outlined'} onClick={() => setIsShowMore(true)}>
          {t('showMore')}
        </Button>
      )}
    </div>
  );
};
