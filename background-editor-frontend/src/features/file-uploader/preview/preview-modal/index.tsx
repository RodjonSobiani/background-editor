import { ModalDialog } from '@shared/components/modal-dialog';
import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { UploadPreviewContent } from '@features/file-uploader/preview';
import { IModalOptions } from '@shared/interfaces/modal';

const MODAL_KEY = EModalKeys.MODAL_UPLOAD_FILES_PREVIEW;

export const UploadPreviewModal = () => {
  const t = useTranslations('uploadPreviewModal');
  const { currentModal, currentData, closeModals } = useModals();
  const isOpen = currentModal === MODAL_KEY;
  const { files, successLabel = 'edit', handleSuccess, handleClose } = currentData as IModalOptions[typeof MODAL_KEY];

  const handleCancel = () => {
    closeModals();
    handleClose?.();
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <UploadPreviewContent
        files={files}
        successLabel={successLabel}
        handleSuccess={handleSuccess}
        handleCancel={handleCancel}
      />
    </ModalDialog>
  );
};
