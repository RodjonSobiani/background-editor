import { IChangeEmailPort } from '@shared/interfaces/entities/user/port';
import { getIsDisabled, JoiResolverI18n } from '@shared/utils';
import { changeEmailSchema } from '@shared/utils/validation/schemas/profile/change-email';
import { FormEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useChangeEmailUseCase } from '../use-case';
import { CustomError } from '@shared/interfaces/castom-error';

export const useChangeEmailPresenter = () => {
  const useCaseChangeEmail = useChangeEmailUseCase();

  const changeEmailForm = useForm<IChangeEmailPort>({
    resolver: JoiResolverI18n(changeEmailSchema)
  });

  const inputs = useWatch({
    control: changeEmailForm.control,
    name: ['password', 'email']
  });

  const formHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await changeEmailForm.handleSubmit(async (data) => {
        await useCaseChangeEmail.mutateAsync(data);
      })();
    } catch (error) {
      const customError = error as CustomError;
      if (customError.errorType === 'NOT_FOUND' || customError.errorType === 'UNAUTHORIZED') {
        changeEmailForm.setError('password', {
          type: 'manual',
          message: customError.errorMessage
        });
      }
    }
  };

  return {
    formHandleSubmit,
    changeEmailForm,
    isDisabled: getIsDisabled(inputs, changeEmailForm.formState),
    isLoading: useCaseChangeEmail.isPending
  };
};
