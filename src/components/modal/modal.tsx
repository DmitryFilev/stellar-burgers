import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useParams } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  const numberOrder = String(useParams().number);
  const titleModal = numberOrder === 'undefined' ? title : `#${numberOrder}`;
  /**
   *Формирование JSX
   */
  return ReactDOM.createPortal(
    <ModalUI title={titleModal} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
