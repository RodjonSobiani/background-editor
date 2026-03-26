import { useEffect, useState } from 'react';

const useMobile = (breakpoint = 1025) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth < breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;
