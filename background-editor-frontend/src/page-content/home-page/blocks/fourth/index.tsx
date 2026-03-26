'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import TariffCard from '@shared/components/tariff-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const FourthBlock = () => {
  const t = useTranslations('homePage.fourthBlock');

  return (
    <div className="fourth-block">
      <div className={'space-y-6'}>
        <h2 className={'title'}>{t('title')}</h2>
        <h3 className={'subtitle'}>{t('subtitle')}</h3>
      </div>
      <div className={'carousel-container'}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          className="mySwiper">
          <SwiperSlide>
            <TariffCard price={'2'} period={'week'} countGenerations={'10'} link={'#'} />
          </SwiperSlide>
          <SwiperSlide>
            <TariffCard price={'8'} period={'week'} countGenerations={'50'} link={'#'} />
          </SwiperSlide>
          <SwiperSlide>
            <TariffCard price={'18'} period={'month'} countGenerations={'100'} link={'#'} />
          </SwiperSlide>
          <SwiperSlide>
            <TariffCard price={'70'} period={'month'} countGenerations={'500'} link={'#'} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
