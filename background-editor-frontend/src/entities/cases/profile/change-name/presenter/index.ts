import { IChangeNamePort } from '@shared/interfaces/entities/user/port';
import { getIsDisabled, JoiResolverI18n } from '@shared/utils';
import { changeNameSchema } from '@shared/utils/validation/schemas/profile/change-name';
import { useForm } from 'react-hook-form';
import { useChangeNameUseCase } from '../use-case';
import useGetMePresenter from '@entities/cases/profile/get-me/presenter';

export const useChangeNamePresenter = () => {
  const { data: user } = useGetMePresenter();
  const { mutateAsync, isPending } = useChangeNameUseCase();

  const changeNameForm = useForm<IChangeNamePort>({
    resolver: JoiResolverI18n(changeNameSchema),
    defaultValues: { name: user?.name }
  });

  const currentName = changeNameForm.watch('name');

  const formHandleSubmit = (data: IChangeNamePort) => {
    void mutateAsync({ ...data });
  };

  const isNameChanged = currentName !== user?.name;
  const hasErrors = !!changeNameForm.formState.errors.name;

  const isDisabled = getIsDisabled([currentName], changeNameForm.formState) || !isNameChanged || hasErrors;

  return {
    formHandleSubmit,
    changeNameForm,
    isDisabled,
    isLoading: isPending
  };
};
