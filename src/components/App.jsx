import React, { Component } from 'react';

import { getImages } from 'services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    showModalWindow: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    getImages(query, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.images],
          totalImages: response.totalImages,
        }));
      })
      .catch(error => {
        console.error('Something went wrong', error);
        this.setState({ error: error.message });
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

  render() {
    const { images, loading, totalImages } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onHandleSubmit} />
        <ImageGallery images={images} openModalWindow={this.openModalWindow} />
        {loading && <Loader />}
        {totalImages !== images.length && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
