import { useMutation } from '@tanstack/react-query';
import { useModals } from '@shared/providers/client/modal-provider';
import { AuthService } from '@shared/api/auth.service';
import { useTranslations } from 'next-intl';
import { errorEnqueueSnackbar } from '@shared/utils';
import { AxiosError } from 'axios';
import { CustomError } from '@shared/interfaces/castom-error';
import { useLoginUseCase } from '@entities/cases/auth';

export const useRegisterUseCase = () => {
  const t = useTranslations();
  const { closeModals } = useModals();
  const { mutateAsync: loginMutateAsync } = useLoginUseCase();

  const handleCloseModal = () => {
    closeModals();
  };

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (_, variables) => {
      handleCloseModal();
      loginMutateAsync({
        email: variables.email,
        password: variables.password
      }).catch(() => {});
    },
    onError: (error: AxiosError<{ type: string }>): never => {
      const errorType = error.response?.data?.type;
      let errorMessage: string;
      if (errorType === 'BUSY') {
        errorMessage = t('errors.BUSY_EMAIL');
      } else {
        errorMessage = errorType ? t(errorType) : t('errors.UNKNOWN_ERROR');
      }
      errorEnqueueSnackbar(t('errors.error'), errorMessage);

      throw { errorType, errorMessage } as CustomError;
    }
  });
};
