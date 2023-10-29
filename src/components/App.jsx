import React, { Component } from 'react';

import { getImages } from 'services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    showModalWindow: false,
    loading: false,
    // error: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true }, this.fetchImages);
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    getImages(query, page)
      .then(response => {
        this.setState(prevState => {
          const uniqueImages = response.images.filter(
            newImage =>
              !prevState.images.some(image => image.id === newImage.id)
          );

          return {
            images: [...prevState.images, ...uniqueImages],
            totalImages: response.totalImages,
            loading: false,
          };
        });
      })
      .catch(error => {
        console.error('Something went wrong', error);
        this.setState({ error: error.message, loading: false });
      });
  };

  onHandleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModalWindow = largeImageURL => {
    this.setState({ showModalWindow: largeImageURL });
  };

  handleCloseModalWindow = () => {
    this.setState({ showModalWindow: '' });
  };

  render() {
    const { images, loading, totalImages, showModalWindow } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onHandleSubmit} />
        <ImageGallery images={images} openModalWindow={this.openModalWindow} />
        {loading && <Loader />}
        {totalImages !== images.length && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModalWindow && (
          <Modal
            showModalWindow={showModalWindow}
            onClose={this.handleCloseModalWindow}
          />
        )}
      </div>
    );
  }
}
