import React from 'react';
import style from './Search.module.scss';
import { SearchContext } from '../../App';
import { useContext } from 'react';
function Search() {
const {searchValue, setSearchValue} = useContext(SearchContext)
  return (
    <div className={style.root}>
      <img className={style.iconSearch} src="img/search.png" alt="" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={style.input}
        type="text"
        placeholder="Поиск ..."
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={style.iconClose}
          src="img/close.png"
          alt="Close"
        />
      )}
    </div>
  );
}

export default Search;
