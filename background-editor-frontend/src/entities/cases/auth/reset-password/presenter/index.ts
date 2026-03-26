import { useResetPasswordUseCase } from '@entities/cases/auth';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '@shared/utils/validation/schemas/auth/reset-password';
import { IResetPasswordPort } from '@shared/interfaces/entities/user/port';
import { errorEnqueueSnackbar, JoiResolverI18n } from '@shared/utils';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CustomError } from '@shared/interfaces/castom-error';

export const useResetPasswordPresenter = () => {
  const t = useTranslations('');
  const { mutateAsync } = useResetPasswordUseCase();
  const resetPasswordForm = useForm<IResetPasswordPort>({
    resolver: JoiResolverI18n(resetPasswordSchema, { 'any.only': t('validation.confirmPassword') })
  });

  const token = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('token') : null;

  useEffect(() => {
    if (token === null) {
      errorEnqueueSnackbar(t('errors.UNKNOWN_ERROR'), '');
    }
  }, [token, t]);

  const formHandleSubmit = async (data: IResetPasswordPort) => {
    try {
      if (!token) return;
      await mutateAsync({
        token: token,
        newPassword: data.newPassword
      });
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'FORBIDDEN') return null;
    }
  };

  return { formHandleSubmit, resetPasswordForm };
};
