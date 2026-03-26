import Icon from '@mdi/react';
import { HTMLAttributes } from 'react';

export const DropdownAction = ({
  pathIcon,
  caption,
  state,
  ...other
}: HTMLAttributes<HTMLDivElement> & {
  pathIcon?: string;
  caption: string;
  state?: 'error';
}) => {
  const attributes = [state === 'error' && 'data-error']
    .filter(Boolean)
    .reduce((result, attribute) => ({ ...result, [attribute as string]: true }), {} as Record<string, boolean>);

  return (
    <div className="flex items-center gap-[10px]" {...other}>
      {pathIcon && <Icon size="16px" path={pathIcon} {...attributes} className="data-error:text-error" />}
      <span {...attributes} className="data-error:text-error">
        {caption}
      </span>
    </div>
  );
};
