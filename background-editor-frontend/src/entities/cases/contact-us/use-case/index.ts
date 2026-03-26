import { useMutation } from '@tanstack/react-query';
import { errorEnqueueSnackbar, successEnqueueSnackbar } from '@shared/utils';
import { useTranslations } from 'next-intl';
import { ContactUs } from '@shared/api/contact-us';

export const useContactUsUseCase = () => {
  const t = useTranslations('contactUs');

  return useMutation({
    mutationFn: ContactUs,
    onSuccess: () => {
      successEnqueueSnackbar(t('successMessage'), '');
    },
    onError: () => {
      errorEnqueueSnackbar(t('error'), '');
    }
  });
};
