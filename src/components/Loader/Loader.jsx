import { createPortal } from 'react-dom';

import { MagnifyingGlass } from 'react-loader-spinner';

import css from './Loader.module.css';

const modalRoot = document.getElementById('modal-root');

export const Loader = () => {
  return createPortal(
    <div className={css.loader}>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>,
    modalRoot
  );
};
