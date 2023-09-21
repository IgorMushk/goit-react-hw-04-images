import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { img } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleClickBackdrop}>
        <div className={css.Modal}>
          <img src={img} alt="" />
        </div>
      </div>
    );
  }
}
