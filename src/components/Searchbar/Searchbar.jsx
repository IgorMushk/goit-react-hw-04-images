import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [inputeValue, setInputeValue] = useState('');

  const handleChange = evt => {
    setInputeValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (inputeValue.trim().length < 1) {
      return toast.error('Enter a search string');
    }
    onSubmit(inputeValue);
  };

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
            <BsSearch size={22} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputeValue}
            onChange={handleChange}
          />
        </form>
      </header>
      <ToastContainer autoClose={2000} />
    </>
  );
}

