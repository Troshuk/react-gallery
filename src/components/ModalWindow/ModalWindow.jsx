import { useEffect } from 'react';

import css from './ModalWindow.module.css';

export const ModalWindow = ({ toggleModal, children }) => {
  useEffect(() => {
    const handleEscapeClick = ({ key }) => key === 'Escape' && toggleModal();

    window.addEventListener('keydown', handleEscapeClick);

    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
    };
  }, [toggleModal]);

  const handleBackdropClick = ({ target, currentTarget }) =>
    target === currentTarget && toggleModal();

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};
