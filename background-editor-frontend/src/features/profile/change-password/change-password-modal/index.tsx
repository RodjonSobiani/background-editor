import { LayoutProfileModal } from '@shared/components/layouts/layout-profile-modal';
import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { useTranslations } from 'next-intl';
import { ChangePasswordForm } from '../change-password-form';

export const ChangePasswordModal = () => {
  const t = useTranslations('changePasswordModal');
  const { currentModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_CHANGE_PASSWORD;

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <LayoutProfileModal form={<ChangePasswordForm />} description={<span>{t('description')}</span>} />
    </ModalDialog>
  );
};
