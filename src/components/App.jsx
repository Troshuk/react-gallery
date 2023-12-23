import { Component } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    query: null,
  };

  searchHandler = query => this.setState({ query });

  render() {
    const { query } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.searchHandler} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
