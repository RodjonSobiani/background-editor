import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { ReactNode, useState, useCallback } from 'react';

export const ModalDialog = ({
  isOpen,
  onClose,
  modalTitle,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  children: ReactNode;
}) => {
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnOverlay(true);
    }
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (mouseDownOnOverlay && e.target === e.currentTarget) {
        onClose();
      }
      setMouseDownOnOverlay(false);
    },
    [mouseDownOnOverlay, onClose]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseDownOnOverlay(false);
  }, []);

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      <div className="modal-container">
        <div className="title-row">
          <div className="body-18px-golos-medium">{modalTitle}</div>
          <button type="button" onClick={handleCloseClick}>
            <Icon path={mdiClose} size={1} className="text-icon cursor-pointer" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
