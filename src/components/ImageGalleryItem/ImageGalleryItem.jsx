import React from 'react';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  openModalWindow,
}) => {
  return (
    <div className={css.imageItem} key={id}>
      <img
        className={css.img}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          openModalWindow(largeImageURL);
        }}
      />
    </div>
  );
};

export default ImageGalleryItem;
