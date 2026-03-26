'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { NextSlideIcon } from '@/shared/components/icons/next-slide-icon';
import type { Swiper as SwiperType } from 'swiper/types';

export const Slider = () => {
  const [canMove, setCanMove] = useState({ isEnd: false, isStart: true });
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = () => sliderRef.current?.swiper.slidePrev();

  const handleNext = () => sliderRef.current?.swiper.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setCanMove({ isEnd: swiper.isEnd, isStart: swiper.isBeginning });
  };

  return (
    <div className="articles-slider">
      <button className="articles-slider__prev" disabled={canMove.isStart} onClick={handlePrev}>
        <NextSlideIcon className="rotate-180" />
      </button>
      <button className="articles-slider__next" disabled={canMove.isEnd} onClick={handleNext}>
        <NextSlideIcon />
      </button>

      <Swiper
        ref={sliderRef}
        slidesPerView={'auto'}
        modules={[Pagination]}
        className="mySwiper"
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <Image width={840} height={480} src="/assets/article-1.png" alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
