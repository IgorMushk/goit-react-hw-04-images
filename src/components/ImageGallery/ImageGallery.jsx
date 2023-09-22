import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

export default function ImageGallery({data}) {
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState('');

const openModal = imgURL => {
  setLargeImageURL(imgURL);
  setShowModal(true);
};

const closeModal = () => {
  setLargeImageURL('');
  setShowModal(false);
}

  return (
    <>
      <ul className={css.ImageGallery}>
        {data.map(img => (
          <ImageGalleryItem
            key={img.id}
            webformatURL={img.webformatURL}
            onOpenModal={() => openModal(img.largeImageURL)}
          />
        ))}
        {showModal && (
          <Modal img={largeImageURL} onClose={closeModal} />
        )}
      </ul>
    </>
  );
}

// export default class ImageGallery extends Component {
//   state = {
//     largeImageURL: '',
//     showModal: false,
//   };
// openModal = imgURL => {
//     this.setState({largeImageURL: imgURL, showModal: true})
// };

// closeModal = () => {
//     this.setState({largeImageURL: '', showModal: false})
// }

// render() {
//     const { data } = this.props;
//     //console.log('data', data)
//     return (
//         <>
//       <ul className={css.ImageGallery}>
//         {data.map(img => (
//           <ImageGalleryItem
//           key={img.id}
//           webformatURL={img.webformatURL}
//           onOpenModal={()=>this.openModal(img.largeImageURL)}
//           />
//         ))}
//         { this.state.showModal && (<Modal img={this.state.largeImageURL} onClose={this.closeModal}/>)}
//       </ul>
//       </>
//     );
//   }
// }
