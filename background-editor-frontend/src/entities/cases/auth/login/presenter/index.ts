import { useLoginUseCase } from '@entities/cases/auth';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@shared/utils/validation/schemas/auth/login';
import { ILoginPort } from '@shared/interfaces/entities/user/port';
import { JoiResolverI18n } from '@shared/utils';
import { CustomError } from '@shared/interfaces/castom-error';

export const useLoginPresenter = () => {
  const { mutateAsync } = useLoginUseCase();

  const loginForm = useForm<ILoginPort>({
    resolver: JoiResolverI18n(loginSchema)
  });

  const { setError } = loginForm;

  const formHandleSubmit = async (data: ILoginPort) => {
    try {
      await mutateAsync({ ...data });
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'NOT_FOUND' || customError.errorType === 'UNAUTHORIZED') {
        setError('email', {
          type: 'manual',
          message: customError.errorMessage
        });
        setError('password', {
          type: 'manual',
          message: customError.errorMessage
        });
      }
    }
  };

  return {
    formHandleSubmit,
    loginForm
  };
};
