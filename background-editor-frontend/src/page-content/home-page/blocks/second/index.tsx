import React from 'react';
import { useTranslations } from 'next-intl';
import HomePageCard from '@shared/components/home-page-card';
import Image from 'next/image';
import removeBackground from '@shared/assets/images/main-page/remove-background.png';
import removeObjects from '@shared/assets/images/main-page/remove-objects.jpg';

export const SecondBlock = () => {
  const t = useTranslations('homePage.secondBlock');
  return (
    <div className="second-block">
      <div className={'space-y-5'}>
        <HomePageCard
          title={t('cards.titles.removingBackground')}
          description={t('cards.descriptions.removingBackground')}
          image={
            <Image
              src={removeBackground}
              alt="removing-background"
              className={'removing-background'}
              style={{
                objectFit: 'cover'
              }}
            />
          }
          backgroundOffsetY={'-60px'}
          backgroundOffsetX={'240px'}
          backgroundRotation={'0'}
        />
      </div>
      <div className={'space-y-5'}>
        <HomePageCard
          title={t('cards.titles.editingBackground')}
          description={t('cards.descriptions.editingBackground')}
          dark={false}
        />
        <HomePageCard
          title={t('cards.titles.removingObjects')}
          description={t('cards.descriptions.removingObjects')}
          image={
            <Image
              src={removeObjects}
              alt="removing-objects"
              className={'removing-objects'}
              style={{
                objectFit: 'cover'
              }}
            />
          }
          backgroundOffsetY={'-150px'}
          backgroundOffsetX={'270px'}
          backgroundRotation={'25deg'}
        />
      </div>
    </div>
  );
};
