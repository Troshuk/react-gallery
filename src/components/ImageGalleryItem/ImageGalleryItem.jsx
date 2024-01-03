import { useState } from 'react';
import { createPortal } from 'react-dom';

import { ModalWindow } from 'components/ModalWindow';

import css from './ImageGalleryItem.module.css';

const modalRoot = document.getElementById('modal-root');

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(showModal => !showModal);

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />

      {showModal &&
        createPortal(
          <ModalWindow toggleModal={toggleModal}>
            <img
              className={css.largeImageGalleryItem}
              src={largeImageURL}
              alt={tags}
            />
          </ModalWindow>,
          modalRoot
        )}
    </li>
  );
};
