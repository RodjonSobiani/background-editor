import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { ModalDialog } from '@shared/components/modal-dialog';
import { UploadForm } from '@features/file-uploader/upload';
import { IModalOptions } from '@shared/interfaces/modal';

const MODAL_KEY = EModalKeys.MODAL_UPLOAD_FILES;

export const UploadModal = () => {
  const t = useTranslations('uploadModal');
  const { currentModal, currentData, closeModals } = useModals();
  const isOpen = currentModal === MODAL_KEY;
  const files = currentData as IModalOptions[typeof MODAL_KEY];
  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <UploadForm files={files} />
    </ModalDialog>
  );
};
