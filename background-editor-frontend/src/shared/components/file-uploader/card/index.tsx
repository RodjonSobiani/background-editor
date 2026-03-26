import Icon from '@mdi/react';
import { mdiClose, mdiFileUpload } from '@mdi/js';
import React, { MouseEvent, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { formattedFileSize } from '@shared/utils';

interface IFileCardProps {
  file: File;
  disabled?: boolean;
  className?: string;
  onClickRemove(e: MouseEvent<HTMLButtonElement>): void;
}

export const FileCard = ({ file, disabled = false, className, onClickRemove }: IFileCardProps) => {
  const t = useTranslations('fileUpload');

  const sizeFormatted = useCallback(
    (fileSize: number) => {
      const [size, unit] = formattedFileSize(fileSize);
      return `${size} ${t(`unit.${unit}`)}`;
    },
    [t]
  );
  const valueClasses = useMemo(() => {
    if (disabled)
      return {
        bg: 'bg-disabled-light',
        icon: 'text-disabled-dark',
        fileName: 'text-disabled-dark',
        fileSize: 'text-disabled-dark'
      };
    return {
      bg: 'bg-light-gray',
      icon: 'text-icon',
      fileName: null,
      fileSize: 'text-secondary'
    };
  }, [disabled]);

  return (
    <div className={`${valueClasses.bg} file-uploader-card-container ${className}`}>
      <div className={'flex items-center gap-1'}>
        <Icon path={mdiFileUpload} size={'24px'} className={`${valueClasses.icon} min-h-6 min-w-6`} />
        <span className={`body-14px-golos-regular break-all ${valueClasses.fileName}`}>{file.name}</span>
      </div>
      <div className={'flex items-center gap-2'}>
        <span className={`body-10px-golos-regular ${valueClasses.fileSize}`}>{sizeFormatted(file.size)}</span>
        <button onClick={onClickRemove} className={'cursor-pointer'}>
          <Icon path={mdiClose} size={'24px'} className={valueClasses.icon} />
        </button>
      </div>
    </div>
  );
};
