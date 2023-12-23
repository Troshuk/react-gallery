import { Component } from 'react';

import css from './ModalWindow.module.css';

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeClick);
  }

  handleEscapeClick = ({ key }) => key === 'Escape' && this.props.toggleModal();

  handleBackdropClick = ({ target, currentTarget }) =>
    target === currentTarget && this.props.toggleModal();

  render() {
    const { children } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>{children}</div>
      </div>
    );
  }
}

export { ModalWindow };
