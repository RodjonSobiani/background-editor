'use client';

import { ArticleLink } from '@shared/components/article-link';
import { ArticlePreview } from '@shared/components/article-preview-item';
import useMobile from '@shared/utils/mobile-detector';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ArticleList = () => {
  const isMobile = useMobile(769);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="articles-preview-slider">
          <Swiper slidesPerView={'auto'} modules={[Pagination]} spaceBetween={20} pagination={{ clickable: true }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ArticlePreview
                  imageUrl="/assets/article-1.png"
                  publishedAt="01.12.2024"
                  title="Будущее искусственного интеллекта в обработке изображений"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <ArticleLink />
      </div>
    );
  }

  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <ArticlePreview
          key={index}
          imageUrl="/assets/article-1.png"
          publishedAt="01.12.2024"
          title="Будущее искусственного интеллекта в обработке изображений"
        />
      ))}

      <ArticleLink />
    </div>
  );
};
