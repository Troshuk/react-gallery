import { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalWindow } from 'components/ModalWindow';

import css from './ImageGalleryItem.module.css';

const modalRoot = document.getElementById('modal-root');

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    const { showModal } = this.state;

    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />

        {showModal &&
          createPortal(
            <ModalWindow toggleModal={this.toggleModal}>
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
  }
}
