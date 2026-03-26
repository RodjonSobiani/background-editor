'use client';

import { usePathname } from 'next/navigation';

const useGetCurrentUrlAddress = () => {
  const pathname = usePathname();

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${pathname}`;
  }

  return '';
};

export default useGetCurrentUrlAddress;
