import { useModals } from '@shared/providers/client/modal-provider';
import { EQueryValues } from '@shared/utils/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorEnqueueSnackbar, successEnqueueSnackbar } from '@shared/utils';
import { useTranslations } from 'next-intl';
import { UserService } from '@shared/api/user.service';
import { AxiosError } from 'axios';
import { CustomError } from '@shared/interfaces/castom-error';

export const useChangePasswordUseCase = () => {
  const t = useTranslations();

  const queryClient = useQueryClient();
  const modals = useModals();

  return useMutation({
    mutationFn: UserService.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryValues.GET_ME] }).then();
      successEnqueueSnackbar(t('changePasswordModal.passwordChange'), '');
      modals.closeModals();
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
