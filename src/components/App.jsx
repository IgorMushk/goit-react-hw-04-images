//import React, { useEffect, useRef, useState } from 'react';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!query) return;
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
          //console.log('-1-')
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
        
        setTotalPage(Math.ceil(data.totalHits / 12));
        setHits(prevHits => (page === 1 ? data.hits : [...prevHits, ...data.hits] ));
        setLoading(false);
        setShowButton(true);

        if (data.hits.length === data.totalHits) {
          // 'zaz,q'
          setShowButton(false);
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        if (data.hits.length < 12) {
          toast.info('Sorry, but this is the last page.');
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      })
      .catch(err => console.log(err));
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setHits([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={hits} />
      {loading && <Loader />}
      {showButton && <Button loadMore={loadMore} currentPage={{ page, totalPage }}/>}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
