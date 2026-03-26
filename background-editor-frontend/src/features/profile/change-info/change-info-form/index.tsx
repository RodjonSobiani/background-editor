import { mdiEmail } from '@mdi/js';
import Icon from '@mdi/react';
import { AvatarProfile } from '@shared/components/avatar-profile';
import { Button } from '@shared/components/buttons';
import { ChangeAttribute } from '@shared/components/change-attribute';
import { PasswordIcon } from '@shared/components/icons/password-icon';
import { LayoutProfile } from '@shared/components/layouts/layout-profile';
import { useModals } from '@shared/providers/client/modal-provider';
import { EModalKeys } from '@shared/utils/enums';
import { useTranslations } from 'next-intl';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';
import useGetMePresenter from '@entities/cases/profile/get-me/presenter';
import { useChangeNamePresenter } from '@entities/cases/profile/change-name';

export const FormProfile = () => {
  const { data: user } = useGetMePresenter();
  const { changeNameForm, formHandleSubmit, isDisabled, isLoading } = useChangeNamePresenter();
  const t = useTranslations('profilePage.profile.form');
  const modals = useModals();

  const handleStartChangeEmail = () => modals.openModal(EModalKeys.MODAL_CHANGE_EMAIL);
  const handleStartChangPassword = () => modals.openModal(EModalKeys.MODAL_CHANGE_PASSWORD);

  return (
    <LayoutProfile
      avatar={<AvatarProfile name={user?.name ?? ''} avatarUrl={user?.avatar} />}
      name={
        <TextFieldControlled
          control={changeNameForm.control}
          disabled={isLoading}
          name="name"
          label={t('label.name')}
          placeholder={user?.name ?? ''}
        />
      }
      email={
        <ChangeAttribute
          label={t('label.email')}
          value={user?.email ?? ''}
          description={t('description.email')}
          onClick={handleStartChangeEmail}
          icon={<Icon path={mdiEmail} className="h-4 w-4" />}
        />
      }
      password={
        <ChangeAttribute
          label={t('label.password')}
          value={t('value.password')}
          description={t('description.password')}
          onClick={handleStartChangPassword}
          icon={<PasswordIcon className="h-4 w-4" />}
        />
      }
      save={
        <Button onClick={changeNameForm.handleSubmit(formHandleSubmit)} disabled={isLoading || isDisabled}>
          {t('button.save')}
        </Button>
      }
    />
  );
};
