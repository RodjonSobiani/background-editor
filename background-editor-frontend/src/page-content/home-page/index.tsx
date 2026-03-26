import React from 'react';
import { FifthBlock } from '@page-content/home-page/blocks/fifth';
import { SixthBlock } from '@page-content/home-page/blocks/sixth';
import { ThirdBlock } from '@page-content/home-page/blocks/third';
import { SecondBlock } from '@page-content/home-page/blocks/second';
import { FirstBlock } from '@page-content/home-page/blocks/first';
import { FourthBlock } from '@page-content/home-page/blocks/fourth';

const HomePageContent = () => {
  return (
    <div className="main-page-wrapper">
      <FirstBlock />
      <SecondBlock />
      <ThirdBlock />
      <FourthBlock />
      <FifthBlock />
      <SixthBlock />
    </div>
  );
};

export default HomePageContent;
