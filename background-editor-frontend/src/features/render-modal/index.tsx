import { LoginModal } from '@features/auth/login';
import { RegisterModal } from '@features/auth/register';
import { RecoverPasswordModal } from '@features/auth/recover-password';
import { RecoverPasswordLetterModal } from '@features/auth/recover-password/recover-password-letter-modal';
import { ResetPasswordModal } from '@features/auth/reset-password';
import { UploadPreviewModal } from '@features/file-uploader/preview';
import { UploadModal } from '@features/file-uploader/upload';
import { ChangeEmailModal, ChangePasswordModal } from '@features/profile';
import { useModals } from '@shared/providers/client/modal-provider';
import { useDisableBodyScroll } from '@shared/utils/hooks/use-disable-body-scroll';
import { EModalKeys } from '@shared/utils/enums';
import { useEffect } from 'react';
import { ResetPasswordSuccessModal } from '@features/auth/reset-password/reset-password-success-modal';

const RenderModal = () => {
  const { currentModal, openModal } = useModals();

  const getParamsFromUrl = () => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const modal = searchParams.get('modal');
      return { modal };
    }
    return { modal: null };
  };

  const { modal } = getParamsFromUrl();

  useEffect(() => {
    if (modal === 'reset-password') {
      openModal(EModalKeys.MODAL_RESET_PASSWORD);
    }
  }, [modal, openModal]);

  useDisableBodyScroll(currentModal);

  switch (currentModal) {
    case EModalKeys.MODAL_REGISTER:
      return <RegisterModal />;
    case EModalKeys.MODAL_LOGIN:
      return <LoginModal />;
    case EModalKeys.MODAL_RECOVER_PASSWORD:
      return <RecoverPasswordModal />;
    case EModalKeys.MODAL_RECOVER_PASSWORD_LETTER:
      return <RecoverPasswordLetterModal />;
    case EModalKeys.MODAL_RESET_PASSWORD:
      return <ResetPasswordModal />;
    case EModalKeys.MODAL_RESET_PASSWORD_SUCCESS:
      return <ResetPasswordSuccessModal />;
    case EModalKeys.MODAL_UPLOAD_FILES:
      return <UploadModal />;
    case EModalKeys.MODAL_UPLOAD_FILES_PREVIEW:
      return <UploadPreviewModal />;
    case EModalKeys.MODAL_CHANGE_EMAIL:
      return <ChangeEmailModal />;
    case EModalKeys.MODAL_CHANGE_PASSWORD:
      return <ChangePasswordModal />;
    default:
      return null;
  }
};

export default RenderModal;
