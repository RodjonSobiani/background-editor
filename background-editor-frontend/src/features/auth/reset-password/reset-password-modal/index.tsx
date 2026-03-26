import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { EModalKeys } from '@shared/utils/enums';
import { ResetPasswordForm } from '@features/auth/reset-password/reset-password-form';

export const ResetPasswordModal = () => {
  const t = useTranslations('resetPasswordModal');
  const { currentModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_RESET_PASSWORD;

  const handleClose = () => {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);

    closeModals();
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={handleClose} modalTitle={t('title')}>
      <ResetPasswordForm />
    </ModalDialog>
  );
};
