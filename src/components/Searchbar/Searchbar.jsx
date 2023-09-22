import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [inputeValue, setInputeValue] = useState('');

  // handleChange
  const handleChange = evt => {
    //console.log(evt.target.value);
    setInputeValue(evt.target.value);
  };

  // handleSubmit
  const handleSubmit = evt => {
    evt.preventDefault();
    if (inputeValue.trim().length < 1) {
      //console.log('this.state.inputeValue.trim().length', this.state.inputeValue.trim().length)
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

// export default class Searchbar extends Component {
//   state = {
//     inputeValue:'',
//   };

//   handleChange = evt => {
//     this.setState({inputeValue: evt.target.value});
//   }

//   handleSubmit = evt => {
//     evt.preventDefault();
//     if (this.state.inputeValue.trim().length < 1) {
//         //console.log('this.state.inputeValue.trim().length', this.state.inputeValue.trim().length)
//         return toast.error("Enter a search string");
//     }
//     this.props.onSubmit(this.state.inputeValue);
//   }

//   render() {
//     return (
//     <>
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//             <BsSearch size={22} />
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputeValue}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//       <ToastContainer autoClose={2000} />
//       </>
//     );
//   }
// }
