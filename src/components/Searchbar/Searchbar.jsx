import { ReactComponent as SearchIcon } from 'icons/search.svg';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form
        className={css.searchForm}
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.elements.search.value);
        }}
      >
        <button type="submit" className={css.searchButton}>
          <SearchIcon className={css.searchLabel} />
        </button>

        <input
          className={css.searchInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
