import React, { Component } from 'react';
import { getImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  // componentDidMount() {
  //   getImages('cat', 1);
  // }

  state = {
    query: '',
    page: 1,
    images: [],
  };
  onHandleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onHandleSubmit} />
      </div>
    );
  }
}
