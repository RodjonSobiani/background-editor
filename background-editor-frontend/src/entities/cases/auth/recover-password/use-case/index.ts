import { useMutation } from '@tanstack/react-query';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { AuthService } from '@shared/api/auth.service';
import { errorEnqueueSnackbar } from '@shared/utils';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';
import { CustomError } from '@shared/interfaces/castom-error';

export const useRecoverPasswordUseCase = () => {
  const t = useTranslations();
  const { openModal, closeModals } = useModals();

  const handleCloseModal = () => {
    closeModals();
  };

  return useMutation({
    mutationFn: AuthService.recoverPassword,
    onSuccess: () => {
      handleCloseModal();
      openModal(EModalKeys.MODAL_RECOVER_PASSWORD_LETTER);
    },
    onError: (error: AxiosError<{ type: string }>): never => {
      const errorType = error.response?.data?.type;
      let errorMessage: string;
      if (errorType === 'NOT_FOUND') {
        errorMessage = t('errors.WRONG_EMAIL');
      } else {
        errorMessage = errorType ? t(errorType) : t('errors.UNKNOWN_ERROR');
      }
      errorEnqueueSnackbar(t('errors.error'), errorMessage);

      throw { errorType, errorMessage } as CustomError;
    }
  });
};
