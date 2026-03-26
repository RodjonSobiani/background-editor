import Image from 'next/image';
import logo from '@shared/assets/images/logo.svg';
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface ILogoProps {
  className?: string;
}

const Logo = ({ className }: ILogoProps): ReactNode => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image src={logo} alt="logo" width={32} height={32} />
      <div className={'h3-furore'}>LOGO</div>
    </Link>
  );
};

export default Logo;
