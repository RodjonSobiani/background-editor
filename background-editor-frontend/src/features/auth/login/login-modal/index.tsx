import { LoginForm } from '@features/auth/login';
import { ModalDialog } from '@shared/components/modal-dialog';
import { useTranslations } from 'next-intl';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';

export const LoginModal = () => {
  const t = useTranslations('loginModal');
  const { currentModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_LOGIN;

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <LoginForm />
    </ModalDialog>
  );
};
