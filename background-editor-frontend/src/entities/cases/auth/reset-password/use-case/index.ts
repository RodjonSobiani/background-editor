import { useMutation } from '@tanstack/react-query';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { AuthService } from '@shared/api/auth.service';
import { errorEnqueueSnackbar } from '@shared/utils';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';
import { CustomError } from '@shared/interfaces/castom-error';

export const useResetPasswordUseCase = () => {
  const t = useTranslations();
  const { closeModals, openModal } = useModals();

  const handleClose = () => {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);

    closeModals();
  };

  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      handleClose();
      openModal(EModalKeys.MODAL_RESET_PASSWORD_SUCCESS);
    },
    onError: (error: AxiosError<{ type: string }>): never => {
      const errorType = error.response?.data?.type;
      let errorMessage: string;
      if (errorType === 'FORBIDDEN') {
        errorMessage = t('errors.FORBIDDEN');
      } else {
        errorMessage = errorType ? t(errorType) : t('errors.UNKNOWN_ERROR');
      }
      errorEnqueueSnackbar(t('errors.error'), errorMessage);

      throw { errorType, errorMessage } as CustomError;
    }
  });
};
