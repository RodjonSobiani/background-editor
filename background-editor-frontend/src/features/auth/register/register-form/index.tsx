import { Button } from '@shared/components/buttons';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { useRegisterPresenter } from '@entities/cases/auth';
import { EModalKeys } from '@shared/utils/enums';
import React from 'react';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';

export const RegisterForm = () => {
  const { openModal } = useModals();
  const t = useTranslations('registerModal');
  const { registerForm, formHandleSubmit } = useRegisterPresenter();

  return (
    <form onSubmit={registerForm.handleSubmit(formHandleSubmit)}>
      <div className={'flex flex-col gap-[32px]'}>
        <div className={'flex flex-col gap-[24px]'}>
          <TextFieldControlled
            control={registerForm.control}
            name={'name'}
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
          />
          <TextFieldControlled
            control={registerForm.control}
            name={'email'}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            type={'email'}
          />
          <TextFieldControlled
            control={registerForm.control}
            name={'password'}
            type={'password'}
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
          />
          <TextFieldControlled
            control={registerForm.control}
            name={'confirmPassword'}
            type={'password'}
            label={t('confirmPasswordLabel')}
            placeholder={t('confirmPasswordPlaceholder')}
          />
        </div>
        <div className={'flex flex-col gap-[16px]'}>
          <Button className={'w-full'}>{t('register')}</Button>
          <span className={'body-14px-golos-regular text-secondary'}>
            {t.rich('agreePersonalData', {
              span: (chunks) => <span className={'text-primary'}>{chunks}</span>
            })}
          </span>
        </div>
        <div className={'text-center'}>
          <span className={'body-14px-golos-regular text-secondary'}>
            {t('haveAnAccount')}{' '}
            <span
              className={'body-14px-golos-regular text-primary cursor-pointer underline'}
              onClick={() => openModal(EModalKeys.MODAL_LOGIN)}>
              {t('login')}
            </span>
          </span>
        </div>
      </div>
    </form>
  );
};
