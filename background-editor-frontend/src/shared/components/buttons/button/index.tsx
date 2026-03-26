import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import loader from '@shared/assets/images/loader.svg';
import Image from 'next/image';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'tertiary' | 'disabled';
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  disabled = false,
  isLoading,
  children,
  ...props
}: IButtonProps): ReactNode => {
  const isDisabled = disabled || variant === 'disabled';

  const buttonClasses = `
    base 
    ${[variant]} 
    ${isDisabled ? 'disabled' : ''}
    ${className ? className : ''}
    ${isLoading ? 'flex gap-2' : ''}
  `.trim();

  return (
    <button className={`${buttonClasses} body-14px-golos-regular`} disabled={isLoading || isDisabled} {...props}>
      {children}
      {isLoading && <Image className={'animate-spin'} src={loader} alt={'loader'} width={24} height={24} />}
    </button>
  );
};
