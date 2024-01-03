import { useState } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <div className={css.app}>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} />
    </div>
  );
};
