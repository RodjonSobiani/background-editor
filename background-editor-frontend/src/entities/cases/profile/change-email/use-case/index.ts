import { useModals } from '@shared/providers/client/modal-provider';
import { EQueryValues } from '@shared/utils/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@shared/api/user.service';
import { errorEnqueueSnackbar, successEnqueueSnackbar } from '@shared/utils';
import { setAuthCookies } from '@shared/utils/auth-cookies';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';
import { CustomError } from '@shared/interfaces/castom-error';

export const useChangeEmailUseCase = () => {
  const t = useTranslations();

  const queryClient = useQueryClient();
  const modals = useModals();

  return useMutation({
    mutationFn: UserService.changeEmail,
    onSuccess: (data) => {
      setAuthCookies(data.accessToken, data.refreshToken);
      void queryClient.invalidateQueries({ queryKey: [EQueryValues.GET_ME] });
      modals.closeModals();
      successEnqueueSnackbar(t('changeEmailModal.emailChange'), '');
    },
    onError: (error: AxiosError<{ type: string }>): never => {
      const errorType = error.response?.data?.type;
      let errorMessage: string;
      if (errorType === 'NOT_FOUND' || errorType === 'UNAUTHORIZED') {
        errorMessage = t('errors.WRONG_PASSWORD');
      } else {
        errorMessage = errorType ? t(errorType) : t('errors.UNKNOWN_ERROR');
      }
      errorEnqueueSnackbar(t('errors.error'), errorMessage);

      throw { errorType, errorMessage } as CustomError;
    }
  });
};
