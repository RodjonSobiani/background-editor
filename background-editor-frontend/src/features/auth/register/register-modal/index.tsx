import { ModalDialog } from '@shared/components/modal-dialog';
import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { RegisterForm } from '@features/auth/register/register-form';

export const RegisterModal = () => {
  const t = useTranslations('registerModal');
  const { currentModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_REGISTER;

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <RegisterForm />
    </ModalDialog>
  );
};
