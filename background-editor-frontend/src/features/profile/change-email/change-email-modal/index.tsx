import { LayoutProfileModal } from '@shared/components/layouts/layout-profile-modal';
import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { useTranslations } from 'next-intl';
import { ChangeEmailForm } from '../change-email-form';
import { ChangeEmailDescription } from '../description';

export const ChangeEmailModal = () => {
  const t = useTranslations('changeEmailModal');
  const modals = useModals();
  const isOpen = modals.currentModal === EModalKeys.MODAL_CHANGE_EMAIL;

  return (
    <ModalDialog isOpen={isOpen} onClose={modals.closeModals} modalTitle={t('title')}>
      <LayoutProfileModal description={<ChangeEmailDescription />} form={<ChangeEmailForm />} />
    </ModalDialog>
  );
};
