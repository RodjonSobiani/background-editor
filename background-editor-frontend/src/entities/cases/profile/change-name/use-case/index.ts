import { EQueryValues } from '@shared/utils/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@shared/api/user.service';
import { errorEnqueueSnackbar, successEnqueueSnackbar } from '@shared/utils';
import { useTranslations } from 'next-intl';

export const useChangeNameUseCase = () => {
  const t = useTranslations('profilePage');

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.changeName,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [EQueryValues.GET_ME] });

      successEnqueueSnackbar(t('snackbar.success'), '');
    },
    onError: () => {
      errorEnqueueSnackbar(t('snackbar.error'), '');
    }
  });
};
