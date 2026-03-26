import { Button } from '@shared/components/buttons';
import { useTranslations } from 'next-intl';
import { useResetPasswordPresenter } from '@entities/cases/auth';
import { TextFieldControlled } from '@shared/components/inputs/text-field-controlled';
import React from 'react';

export const ResetPasswordForm = () => {
  const t = useTranslations('resetPasswordModal');
  const { resetPasswordForm, formHandleSubmit } = useResetPasswordPresenter();

  return (
    <div className={'space-y-6'}>
      <form onSubmit={resetPasswordForm.handleSubmit(formHandleSubmit)}>
        <div className={'flex flex-col gap-[24px]'}>
          <TextFieldControlled
            control={resetPasswordForm.control}
            name={'newPassword'}
            type={'password'}
            label={t('newPasswordLabel')}
            placeholder={t('passwordPlaceholder')}
          />
          <TextFieldControlled
            control={resetPasswordForm.control}
            name={'confirmNewPassword'}
            type={'password'}
            label={t('confirmNewPasswordLabel')}
            placeholder={t('passwordPlaceholder')}
          />
          <div className={'flex flex-col gap-[32px]'}>
            <Button className={'w-full'}>{t('save')}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
