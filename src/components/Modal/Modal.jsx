//import React, { Component } from 'react';
import React, { useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ img, onClose }) {
  //  componentDidMount
  //  componentWillUnmount
  useEffect(() => {
    //console.log('set handleKeyDown');
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      //console.log('remove handleKeyDown ');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = evt => {
    if (evt.target === evt.currentTarget) onClose();
  };

  return (
    <div className={css.Overlay} onClick={handleClickBackdrop}>
      <div className={css.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
}
