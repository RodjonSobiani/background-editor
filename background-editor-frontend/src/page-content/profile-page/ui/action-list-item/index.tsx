import clsx from 'clsx';
import { ReactNode } from 'react';

const getColorClassname = (color: 'error' | undefined, selected: boolean) => {
  return clsx(
    {
      error: 'text-error',
      common: selected ? 'text-black' : 'text-icon'
    }[color ?? 'common']
  );
};

export const ListItem = ({
  selected,
  caption,
  color,
  className,
  renderIcon,
  onClick
}: {
  selected: boolean;
  caption: string;
  color?: 'error';
  className?: string;
  onClick?: () => void;
  renderIcon: (className: string) => ReactNode;
}) => {
  const colorClassname = getColorClassname(color, selected);

  return (
    <li
      onClick={onClick}
      className={clsx(
        'action-list-item',
        {
          'bg-light-gray': selected,
          'bg-transparent': !selected
        },
        className
      )}>
      <div className="flex h-[24px] w-[24px] items-center justify-center">{renderIcon(colorClassname)}</div>

      <span className={colorClassname}>{caption}</span>
    </li>
  );
};
