import React from 'react';
import { useTranslations } from 'next-intl';

interface IDropdownDownloadItemProps {
  title: number;
  isPro?: boolean;
  imageDimensions: string;
}

export const DropdownDownloadItem = ({ title, isPro = false, imageDimensions }: IDropdownDownloadItemProps) => {
  const t = useTranslations('workingArea.downloadOption');
  return (
    <div className={'flex justify-between gap-2'}>
      <div className={'flex flex-col gap-2'}>
        <span>{t(title.toString())}</span>
        <span className={'body-12px-golos-medium peer-active::text-secondary active:text-white'}>
          {imageDimensions}
        </span>
      </div>
      {isPro && (
        <div>
          <div className={'bg-light-gray rounded-sm px-2 py-0.5'}>
            <span className={'text-secondary body-12px-golos-medium'}>Pro</span>
          </div>
        </div>
      )}
    </div>
  );
};
