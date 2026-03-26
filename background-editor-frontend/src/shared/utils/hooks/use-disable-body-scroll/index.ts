import { useEffect } from 'react';

export const useDisableBodyScroll = (condition: unknown) => {
  useEffect(() => {
    if (condition) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add('no-scroll');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = '';
    };
  }, [condition]);
};
