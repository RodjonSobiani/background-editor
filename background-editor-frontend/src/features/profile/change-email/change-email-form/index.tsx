import { useChangeEmailPresenter } from '@entities/cases/profile/change-email/presenter';
import { Button } from '@shared/components/buttons';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';

export const ChangeEmailForm = () => {
  const t = useTranslations('changeEmailModal.form');

  const { changeEmailForm, formHandleSubmit, isLoading, isDisabled } = useChangeEmailPresenter();
  const modals = useModals();

  return (
    <form onSubmit={formHandleSubmit}>
      <div className="mb-8 flex flex-col gap-6">
        <TextFieldControlled
          name={'password'}
          control={changeEmailForm.control}
          disabled={isLoading}
          label={t('label.password')}
          placeholder={t('placeholder.password')}
          type="password"
        />

        <TextFieldControlled
          control={changeEmailForm.control}
          disabled={isLoading}
          label={t('label.email')}
          placeholder={t('placeholder.email')}
          name="email"
          type={'email'}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" disabled={isLoading} onClick={modals.closeModals}>
          {t('button.cancel')}
        </Button>
        <Button disabled={isLoading || isDisabled} type="submit" variant="primary">
          {t('button.save')}
        </Button>
      </div>
    </form>
  );
};
