import { ModalDialog } from '@shared/components/modal-dialog';
import { useModals } from '@shared/providers/client/modal-provider';
import { useTranslations } from 'next-intl';
import { EModalKeys } from '@shared/utils/enums';

export const RecoverPasswordLetterModal = () => {
  const t = useTranslations('recoverPasswordModal');
  const { currentModal, openModal, closeModals } = useModals();
  const isOpen = currentModal === EModalKeys.MODAL_RECOVER_PASSWORD_LETTER;

  const handler = () => {
    closeModals();
    openModal(EModalKeys.MODAL_RECOVER_PASSWORD);
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={closeModals} modalTitle={t('title')}>
      <div className="space-y-6">
        <div>{t('description1')}</div>
        <div>
          {t.rich('description2', {
            b: (chunks) => (
              <b onClick={handler} className={'cursor-pointer underline'}>
                {chunks}
              </b>
            )
          })}
        </div>
      </div>
    </ModalDialog>
  );
};
