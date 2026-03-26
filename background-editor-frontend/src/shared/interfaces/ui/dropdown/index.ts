import { HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';

interface IDropdownOption {
  label: ReactNode | string;
  value: string;
  onClick?: () => void;
  href?: string;
}

interface IDropdownProps {
  className?: string;
  listContainerClassName?: string;
  ref?: RefObject<HTMLDivElement>;
  options: IDropdownOption[];
  label?: ReactNode;
  labelComponent?: ReactElement<HTMLAttributes<HTMLDivElement>>;
  isSelected?: boolean;
  position?: 'left' | 'center' | 'right';
  onSelect?: (value: string) => void;
  selectedValue?: string;
}

export type { IDropdownOption, IDropdownProps };
