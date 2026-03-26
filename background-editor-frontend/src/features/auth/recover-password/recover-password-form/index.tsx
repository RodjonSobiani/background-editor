import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';
import { useRecoverPasswordPresenter } from '@entities/cases/auth';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';

export const RecoverPasswordForm = () => {
  const t = useTranslations('recoverPasswordModal');
  const { recoverPasswordForm, formHandleSubmit, isLoading } = useRecoverPasswordPresenter();

  return (
    <div className={'space-y-6'}>
      <div>{t('recoverInstruction')}</div>
      <form onSubmit={recoverPasswordForm.handleSubmit(formHandleSubmit)}>
        <div className={'flex flex-col gap-[24px]'}>
          <TextFieldControlled
            control={recoverPasswordForm.control}
            name={'email'}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            type={'email'}
          />
          <div className={'flex flex-col gap-[32px]'}>
            <Button className={'w-full'} disabled={isLoading} type="submit">
              {t('send')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
