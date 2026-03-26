import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { EModalKeys } from '@shared/utils/enums';
import { Button } from '@shared/components/buttons';
import React from 'react';

export const ResetPasswordSuccessModal = () => {
  const t = useTranslations('resetPasswordSuccessModal');
  const { currentModal, closeModals, openModal } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_RESET_PASSWORD_SUCCESS;

  const handler = () => {
    closeModals();
    openModal(EModalKeys.MODAL_LOGIN);
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <div className="space-y-8">
        <div>{t('description')}</div>
        <Button onClick={handler} className={'w-full'}>
          {t('goToAuth')}
        </Button>
      </div>
    </ModalDialog>
  );
};
