import { useRecoverPasswordUseCase } from '@entities/cases/auth';
import { useForm, useWatch } from 'react-hook-form';
import { recoverPasswordSchema } from '@shared/utils/validation/schemas/auth/recover-password';
import { IRecoverPasswordPort } from '@shared/interfaces/entities/user/port';
import { getIsDisabled, JoiResolverI18n } from '@shared/utils';
import useGetCurrentUrlAddress from '@shared/utils/get-current-url-address';
import { useLocale } from 'next-intl';
import { CustomError } from '@shared/interfaces/castom-error';

export const useRecoverPasswordPresenter = () => {
  const { mutateAsync, isPending } = useRecoverPasswordUseCase();

  const currentLink = useGetCurrentUrlAddress();
  const locale = useLocale();

  const recoverPasswordForm = useForm<IRecoverPasswordPort>({
    resolver: JoiResolverI18n(recoverPasswordSchema)
  });

  const inputs = useWatch({
    control: recoverPasswordForm.control,
    name: ['email']
  });

  const { setError } = recoverPasswordForm;

  const formHandleSubmit = async (data: IRecoverPasswordPort) => {
    try {
      await mutateAsync({ ...data, link: currentLink, locale });
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'NOT_FOUND') {
        setError('email', {
          type: 'manual',
          message: customError.errorMessage
        });
      }
    }
  };

  return {
    formHandleSubmit,
    recoverPasswordForm,
    isDisabled: getIsDisabled(inputs, recoverPasswordForm.formState),
    isLoading: isPending
  };
};
