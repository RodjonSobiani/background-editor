import { CurrentTariffCard } from '@shared/components/current-tariff-card';
import TariffCard from '@shared/components/tariff-card';
import { useTranslations } from 'next-intl';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

export const TariffViewer = () => {
  const t = useTranslations('profilePage.tariff');
  const tariffT = useTranslations('tariffCards.names');

  return (
    <div className="flex flex-col">
      <span className="mb-6 text-xl">{t('yourTariff')}</span>

      <div className="mb-8 flex gap-4">
        <CurrentTariffCard tariffName={tariffT('free')} generationCount={10} tariffPrice={0} />
      </div>

      <span className="mb-6 text-xl">{t('availableTariffs')}</span>

      <div className="flex gap-5 overflow-x-hidden pb-1">
        <div className="carousel-container">
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
    </div>
  );
};
