import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from '../api/pixbayAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  //const prevQueryRef = useRef();

  // componentDidUpdate
  useEffect(() => {
    if(!query) return;
    setLoading(true);
    setShowButton(false);
    fetchImages(query, page, 12)
      .then(data => {
        if (!data.hits.length & !data.totalHits) {
          setLoading(false);
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }

        setTotalPage(Math.ceil(data.totalHits / 12));
        setHits([...hits, ...data.hits]);
        setLoading(false);
        setShowButton(true)

        if (data.hits.length === data.totalHits) {
          // 'zaz'
          setShowButton(false);
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(err => console.log(err));
  }, [query, page]);

  // onSubmit = query => {
  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setHits([]);
  }

  const loadMore = () => {
    setPage((prevPage)=> prevPage+1)
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={hits} />
      {loading && <Loader />}
      {showButton && <Button loadMore={loadMore} />}
      <ToastContainer autoClose={1500} />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     query: '',
//     hits: [],
//     page: 1,
//     totalPage: 0,
//     loading: false,
//     showButton: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
//       this.setState({ hits: [], page: 1, showButton: false, loading: true });
//       fetchImages(this.state.query, this.state.page, 12)
//         .then(data => {
//           if (!data.hits.length & !data.totalHits) {
//             this.setState({loading: false})
//             return toast.warn(
//               'Sorry, there are no images matching your search query. Please try again.'
//             );
//           }
//           if (this.state.page === 1) {
//             toast.success(`Hooray! We found ${data.totalHits} images.`);
//           }

//           this.setState({
//             totalPage: Math.ceil(data.totalHits / 12),
//             hits: data.hits,
//             loading: false,
//             showButton: true,
//           });

//           if (data.hits.length === data.totalHits) {
//             // 'zaz'
//             this.setState({showButton: false})
//             toast.info(
//               "We're sorry, but you've reached the end of search results."
//             );
//           }

//         })
//         .catch(err => console.log(err));
//     }
//   }

//   onSubmit = query => {
//     this.setState({ query,  page: 1, });
//   };

//   loadMore = () => {
//     // console.log(this.state.page);
//     // this.setState(
//     //   prevState => ({ page: prevState.page + 1 }),
//     //   () => console.log(this.state.page)
//     // );

//     fetchImages(this.state.query, this.state.page+1, 12)
//       .then(data => {

//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...data.hits],
//           loading: false,

//           page: prevState.page + 1,
//         }));
//         if (data.hits.length < 12) {
//           toast.info("Sorry, but this is the last page.");
//           this.setState({showButton: false})
//         } else {
//           this.setState({showButton: true})
//         }

//       })
//       .catch(err => console.log(err));
//   };

//   render() {
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.onSubmit} />
//         <ImageGallery data={this.state.hits} />
//         {this.state.loading && <Loader/>}
//         {this.state.showButton && <Button loadMore={this.loadMore} />}
//         <ToastContainer autoClose={2000} />
//       </div>
//     );
//   }
// }
