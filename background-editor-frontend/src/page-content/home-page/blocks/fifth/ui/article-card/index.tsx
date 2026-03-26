import React from 'react';
import Image from 'next/image';
import removeObjects from '@shared/assets/images/main-page/remove-objects.jpg';

export const ArticleCard = () => {
  return (
    <div>
      <div className={'mb-3'}>
        <Image
          width={0}
          height={0}
          className={'max-h-[225px] rounded-lg object-cover'}
          src={removeObjects}
          alt={'article'}
        />
      </div>
      <p className={'body-18px-golos-medium mb-2'}>Будущее искусственного интеллекта в обработке изображений</p>
      <span className={'text-secondary'}>01.12.2024</span>
    </div>
  );
};
