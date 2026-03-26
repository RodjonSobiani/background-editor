import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { EModalKeys } from '@shared/utils/enums';
import { RecoverPasswordForm } from '@features/auth/recover-password/recover-password-form';

export const RecoverPasswordModal = () => {
  const t = useTranslations('recoverPasswordModal');
  const { currentModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_RECOVER_PASSWORD;
  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <RecoverPasswordForm />
    </ModalDialog>
  );
};
