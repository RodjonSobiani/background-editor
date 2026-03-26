import { Button } from '@shared/components/buttons';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { useLoginPresenter } from '@entities/cases/auth';
import { EModalKeys } from '@shared/utils/enums';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';

export const LoginForm = () => {
  const { openModal } = useModals();
  const t = useTranslations('loginModal');
  const { loginForm, formHandleSubmit } = useLoginPresenter();

  return (
    <form onSubmit={loginForm.handleSubmit(formHandleSubmit)}>
      <div className={'flex flex-col gap-[24px]'}>
        <TextFieldControlled
          control={loginForm.control}
          name={'email'}
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          type={'email'}
        />
        <TextFieldControlled
          control={loginForm.control}
          name={'password'}
          type={'password'}
          label={t('passwordLabel')}
          placeholder={t('passwordPlaceholder')}
        />
        <div className={'flex flex-col gap-[32px]'}>
          <span
            className={'body-12px-golos-medium text-secondary cursor-pointer'}
            onClick={() => openModal(EModalKeys.MODAL_RECOVER_PASSWORD)}>
            {t('forgotPassword')}
          </span>
          <Button className={'w-full'}>{t('login')}</Button>
          <div className={'text-center'}>
            <span className={'body-14px-golos-regular text-secondary'}>
              {t('noAccount')}{' '}
              <span
                className={'body-14px-golos-regular text-primary cursor-pointer underline'}
                onClick={() => openModal(EModalKeys.MODAL_REGISTER)}>
                {t('register')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
