'use client';

import React, { memo } from 'react';
import DesktopHeader from '@widgets/layout/header/desktop';
import MobileHeader from '@widgets/layout/header/mobile';
import useMobile from '@shared/utils/mobile-detector';

const Header = () => {
  const isMobile = useMobile();

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default memo(Header);
