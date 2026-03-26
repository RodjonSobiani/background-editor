import { IChangePasswordPort } from '@shared/interfaces/entities/user/port';
import { getIsDisabled, JoiResolverI18n } from '@shared/utils';
import { changePasswordSchema } from '@shared/utils/validation/schemas/profile/change-password';
import { FormEvent, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useChangePasswordUseCase } from '../use-case';
import { CustomError } from '@shared/interfaces/castom-error';
import { useTranslations } from 'next-intl';

export const useChangePasswordPresenter = () => {
  const t = useTranslations('validation');
  const useCaseChangePassword = useChangePasswordUseCase();

  const changePasswordForm = useForm<IChangePasswordPort>({
    resolver: JoiResolverI18n(changePasswordSchema)
  });

  const { watch, setError, clearErrors, formState } = changePasswordForm;
  const [newPasswordWatch, confirmPasswordWatch] = watch(['newPassword', 'confirmPassword']);

  const inputs = useWatch({
    control: changePasswordForm.control,
    name: ['currentPassword', 'newPassword', 'confirmPassword']
  });

  const formHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await changePasswordForm.handleSubmit(async (data) => {
        await useCaseChangePassword.mutateAsync(data);
      })();
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'NOT_FOUND' || customError.errorType === 'UNAUTHORIZED') {
        setError('currentPassword', {
          type: 'manual',
          message: customError.errorMessage
        });
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitted && newPasswordWatch !== confirmPasswordWatch) {
      setError('confirmPassword', {
        message: t('confirmPassword')
      });
    } else if (!!newPasswordWatch && !!confirmPasswordWatch && newPasswordWatch.length && confirmPasswordWatch.length) {
      clearErrors('confirmPassword');
    }
  }, [newPasswordWatch, confirmPasswordWatch, setError, clearErrors, t, formState.isSubmitted]);

  return {
    formHandleSubmit,
    changePasswordForm,
    isDisabled: getIsDisabled(inputs, changePasswordForm.formState),
    isLoading: useCaseChangePassword.isPending
  };
};
