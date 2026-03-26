import { useRegisterUseCase } from '@entities/cases/auth';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@shared/utils/validation/schemas/auth/register';
import { IRegisterPort } from '@shared/interfaces/entities/user/port';
import { JoiResolverI18n } from '@shared/utils';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { CustomError } from '@shared/interfaces/castom-error';

export const useRegisterPresenter = () => {
  const t = useTranslations('validation');
  const { mutateAsync } = useRegisterUseCase();

  const { ...registerForm } = useForm<IRegisterPort>({
    resolver: JoiResolverI18n(registerSchema, { 'any.only': t('confirmPassword') })
  });

  const { watch, setError, clearErrors, formState } = registerForm;
  const [passwordWatch, confirmPasswordWatch] = watch(['password', 'confirmPassword']);

  const formHandleSubmit = async (data: IRegisterPort) => {
    try {
      await mutateAsync({ ...data });
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'BUSY') {
        setError('email', {
          type: '',
          message: customError.errorMessage
        });
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitted && passwordWatch !== confirmPasswordWatch) {
      setError('confirmPassword', {
        message: t('confirmPassword')
      });
    } else if (!!passwordWatch && !!confirmPasswordWatch && passwordWatch.length && confirmPasswordWatch.length) {
      clearErrors('confirmPassword');
    }
  }, [passwordWatch, confirmPasswordWatch, setError, clearErrors, t, formState.isSubmitted]);

  return {
    formHandleSubmit,
    registerForm
  };
};
