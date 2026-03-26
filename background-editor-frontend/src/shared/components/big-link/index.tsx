import React from 'react';
import Icon from '@mdi/react';
import { mdiArrowTopRight } from '@mdi/js';
import Link from 'next/link';

interface IBigLinkProps {
  href: string | object;
  number?: string;
  title: string;
}

const BigLink = ({ href = '#', number, title }: IBigLinkProps) => {
  const safeHref = href || '#';

  return (
    <Link
      href={safeHref}
      className={'border-border flex max-h-[120px] w-full flex-row items-center justify-between rounded-lg border p-6'}>
      <div className={'space-y-4'}>
        <div className={'h3-furore text-secondary'}>{number}</div>
        <div className={'h3-golos-regular'}>{title}</div>
      </div>
      <Icon path={mdiArrowTopRight} size={1} className={'text-icon'} />
    </Link>
  );
};

export default BigLink;
