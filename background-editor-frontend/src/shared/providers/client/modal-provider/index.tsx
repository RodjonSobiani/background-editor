import React, { createContext, useContext, useState } from 'react';
import RenderModal from '@features/render-modal';
import { EModalKeys } from '@shared/utils/enums';
import { IModalOptions } from '@shared/interfaces/modal';

type BaseModalType = `${EModalKeys}`;

type ExtendedModalType = BaseModalType | string;
type ModalType = ExtendedModalType | null;

type ModalContextType = {
  currentModal: ModalType;
  currentData?: IModalOptions[EModalKeys];
  openModal: <K extends EModalKeys>(type: K, data?: IModalOptions[K]) => void;
  closeModal?: <K extends EModalKeys>(type: K, data?: IModalOptions[K]) => void;
  closeModals: () => void;
};

const ModalContext = createContext<ModalContextType>({
  currentModal: null,
  openModal: () => {},
  closeModal: () => {},
  closeModals: () => {}
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [currentData, setCurrentData] = useState<IModalOptions[EModalKeys]>();

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        currentData,
        openModal: (type, data) => {
          setCurrentModal(type);
          setCurrentData(data);
        },
        closeModal: () => {
          setCurrentModal(null);
          setCurrentData(undefined);
        },
        closeModals: () => {
          setCurrentModal(null);
          setCurrentData(undefined);
        }
      }}>
      {children}
      <RenderModal />
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);
