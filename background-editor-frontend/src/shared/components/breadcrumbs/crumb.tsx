'use client';

import Icon from '@mdi/react';
import { ArrowRightIcon } from '@shared/components/icons/arrow-right-icon';
import { ReactNode } from 'react';
import Link from 'next/link';

interface ICrumbProps {
  caption: string;
  isLast: boolean;
  icon?: string | ReactNode;
  to?: string;
}

const Div = ({ children, className, href }: { children: ReactNode; href: string; className: string }) => (
  <div className={className}>
    <span className="hidden">{href}</span>
    {children}
  </div>
);

const Crumb = ({ to, icon, isLast, caption }: ICrumbProps) => {
  const Wrapper = to ? Link : Div;

  return (
    <Wrapper href={to as string} className="text-secondary flex items-center gap-2 text-nowrap">
      {icon ? typeof icon === 'string' ? <Icon path={icon} size="24px" /> : icon : <ArrowRightIcon />}
      <span className={isLast ? 'text-black' : ''}>{caption}</span>
    </Wrapper>
  );
};

export { type ICrumbProps, Crumb };
