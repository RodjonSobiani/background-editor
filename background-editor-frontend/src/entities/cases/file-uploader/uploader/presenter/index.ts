import { useEffect, useState } from 'react';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';

interface IUseFileUploaderPresenterProps {
  files: File[];
}

export const useFileUploaderPresenter = ({ files }: IUseFileUploaderPresenterProps) => {
  const { openModal, closeModals } = useModals();
  const [filesState, setFilesState] = useState<File[]>(files);

  const handleRemoveFile = (index: number) => () => {
    setFilesState(filesState.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    closeModals();
    openModal(EModalKeys.MODAL_UPLOAD_FILES_PREVIEW, { files: filesState });
  };

  useEffect(() => {
    if (!filesState.length) {
      closeModals();
    }
  }, [closeModals, filesState]);

  return {
    filesState,
    handleUpload,
    handleRemoveFile,
    closeModals
  };
};
