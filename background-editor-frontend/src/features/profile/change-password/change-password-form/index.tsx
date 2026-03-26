import { useChangePasswordPresenter } from '@entities/cases/profile/change-password/presenter';
import { Button } from '@shared/components/buttons';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';

export const ChangePasswordForm = () => {
  const t = useTranslations('changePasswordModal.form');

  const { formHandleSubmit, changePasswordForm, isLoading, isDisabled } = useChangePasswordPresenter();
  const modals = useModals();

  return (
    <form onSubmit={formHandleSubmit}>
      <div className="mb-8 flex flex-col gap-6">
        <TextFieldControlled
          name={'currentPassword'}
          control={changePasswordForm.control}
          disabled={isLoading}
          label={t('label.currentPassword')}
          placeholder={t('placeholder.currentPassword')}
          type="password"
        />

        <TextFieldControlled
          name={'newPassword'}
          control={changePasswordForm.control}
          disabled={isLoading}
          label={t('label.newPassword')}
          placeholder={t('placeholder.newPassword')}
          type="password"
        />

        <TextFieldControlled
          name={'confirmPassword'}
          control={changePasswordForm.control}
          disabled={isLoading}
          label={t('label.confirmPassword')}
          placeholder={t('placeholder.confirmPassword')}
          type="password"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={modals.closeModals}>
          {t('button.cancel')}
        </Button>
        <Button type="submit" variant="primary" disabled={isDisabled}>
          {t('button.save')}
        </Button>
      </div>
    </form>
  );
};
