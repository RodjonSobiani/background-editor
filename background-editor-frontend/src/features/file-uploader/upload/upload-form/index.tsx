import React from 'react';
import { FileCard } from '@shared/components/file-uploader';
import { useFileUploaderPresenter } from '@entities/cases/file-uploader/uploader/presenter';
import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';

interface IUploadFormProps {
  files: File[];
}

export const UploadForm = ({ files }: IUploadFormProps) => {
  const t = useTranslations('uploadModal');
  const { filesState, handleUpload, handleRemoveFile, closeModals } = useFileUploaderPresenter({ files });

  return (
    <div className={'space-y-8'}>
      <div>
        <div className={'max-h-36 space-y-2 overflow-y-auto'}>
          {filesState.map((file, index) => (
            <FileCard key={file.lastModified} file={file} onClickRemove={handleRemoveFile(index)} />
          ))}
        </div>
      </div>
      <div className={'flex justify-end gap-3'}>
        <Button variant={'secondary'} onClick={closeModals}>
          {t('cancel')}
        </Button>
        <Button onClick={handleUpload}>{t('upload')}</Button>
      </div>
    </div>
  );
};
