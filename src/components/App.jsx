import React, { Component } from 'react';
import { getImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  // componentDidMount() {
  //   getImages('cat', 1);
  // }

  state = {
    query: '',
    page: 1,
    images: [],
    showModalWindow: false,
  };
  onHandleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
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
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onHandleSubmit} />
        <ImageGallery images={images} openModalWindow={this.openModalWindow} />
      </div>
    );
  }
}
