import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModals } from '@shared/providers/client/modal-provider';
import { EQueryValues } from '@shared/utils/enums';
import { AuthService } from '@shared/api/auth.service';
import { useAuth } from '@shared/providers/client/auth-provider';
import { errorEnqueueSnackbar } from '@shared/utils';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { CustomError } from '@shared/interfaces/castom-error';

export const useLoginUseCase = () => {
  const t = useTranslations();
  const { closeModals } = useModals();
  const queryClient = useQueryClient();
  const { login } = useAuth();

  const handleCloseModal = () => {
    closeModals();
  };

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken);
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: [EQueryValues.GET_ME] }).then();
    },
    onError: (error: AxiosError<{ type: string }>): never => {
      const errorType = error.response?.data?.type;
      let errorMessage: string;
      if (errorType === 'NOT_FOUND' || errorType === 'UNAUTHORIZED') {
        errorMessage = t('errors.WRONG_EMAIL_OR_PASSWORD');
      } else {
        errorMessage = errorType ? t(errorType) : t('errors.UNKNOWN_ERROR');
      }
      errorEnqueueSnackbar(t('errors.error'), errorMessage);

      throw { errorType, errorMessage } as CustomError;
    }
  });
};
