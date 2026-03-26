'use client';
import Image from 'next/image';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';
import { usePreviewUploaderPresenter } from '@entities/cases/file-uploader/preview/presenter';

interface IUploadPreviewContentProps {
  files: File[];
  successLabel: string;
  handleSuccess?: (files: File[]) => void;

  handleCancel(): void;
}

export const UploadPreviewContent = ({
  files,
  successLabel,
  handleSuccess,
  handleCancel
}: IUploadPreviewContentProps) => {
  const t = useTranslations('uploadPreviewModal');
  const { getSelectedFile, listFiles, isLoading, handleChooseFile, handleEdit } = usePreviewUploaderPresenter({
    files,
    handleSuccess
  });

  return (
    <div className={'space-y-8'}>
      <div className={'space-y-4'}>
        <div className={'upload-modal-image overflow-hidden rounded-[20px]'}>
          {getSelectedFile && (
            <Image src={getSelectedFile} alt={'selected'} width={0} height={0} className={'w-full'} />
          )}
        </div>
        <div className={'flex flex-wrap gap-4'}>
          {listFiles.map(({ file, border }, index) => (
            <div key={index} className={`upload-modal-image files-list ${border}`} onClick={handleChooseFile(index)}>
              <Image src={file} alt={`file-${index}`} width={0} height={0} className={'h-full w-auto object-contain'} />
            </div>
          ))}
        </div>
      </div>
      <div className={'flex justify-end gap-3'}>
        <Button variant={'secondary'} onClick={handleCancel}>
          {t('cancel')}
        </Button>
        <Button onClick={handleEdit} isLoading={isLoading}>
          {t(successLabel)}
        </Button>
      </div>
    </div>
  );
};
