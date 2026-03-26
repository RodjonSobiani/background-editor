import { Crumb } from '@shared/components/breadcrumbs/crumb';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface IGetParsedPathnameOptions {
  excludePrefix?: boolean;
  joinPrefixes?: string | string[];
  joinPostfixes?: (searchParams: URLSearchParams) => string | null | string[];
}
const getParsedPathname = (url: string, options: IGetParsedPathnameOptions) => {
  const newUrl = new URL(url);
  const joinPostfixes = options?.joinPostfixes?.(newUrl.searchParams);

  const prefix =
    typeof options?.joinPrefixes === 'undefined'
      ? []
      : typeof options.joinPrefixes === 'string'
        ? [options.joinPrefixes]
        : Array.isArray(options.joinPrefixes)
          ? options.joinPrefixes
          : [];

  const base = newUrl.pathname.split('/').slice(options?.excludePrefix ? 2 : 1);

  return prefix
    .concat(base)
    .concat(
      !['string', 'object'].includes(typeof joinPostfixes)
        ? []
        : typeof joinPostfixes === 'string'
          ? [joinPostfixes]
          : Array.isArray(joinPostfixes)
            ? joinPostfixes
            : []
    );
};

export const getServerBreadcrumbs = async (options: IGetParsedPathnameOptions = {}) => {
  const headersList = await headers();

  const link = headersList.get('link')?.split(';')[0] ?? '';
  const url = link.substring(1, link.length - 1);

  return getParsedPathname(url, {
    excludePrefix: true,
    joinPrefixes: ['root'],
    ...options
  });
};

const isLast = <T,>(array: T[], index: number) => array.length - 1 === index;

export const Breadcrumbs = ({
  className,
  breadcrumbs
}: {
  className?: string;
  breadcrumbs: Array<{ caption: string; icon?: string | ReactNode; to?: string }>;
}) => {
  return (
    <div className="no-scrollbar w-full overflow-auto">
      <div className={`flex items-center gap-2 ${className || ''}`}>
        {breadcrumbs.map((crumb, index, array) => (
          <Crumb key={index} caption={crumb.caption} icon={crumb.icon} to={crumb.to} isLast={isLast(array, index)} />
        ))}
      </div>
    </div>
  );
};
