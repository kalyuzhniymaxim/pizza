import React, { useCallback, useRef, useState } from 'react';
import style from './Search.module.scss';
import { SearchContext } from '../../App';
import { useContext } from 'react';
import debounce from 'lodash.debounce';
function Search() {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const InputRef = useRef<HTMLInputElement>(null);
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    InputRef.current?.focus();
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  return (
    <div className={style.root}>
      <img className={style.iconSearch} src="img/search.png" alt="" />
      <input
        ref={InputRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        type="text"
        placeholder="Поиск ..."
      />
      {value && (
        <img onClick={onClickClear} className={style.iconClose} src="img/close.png" alt="Close" />
      )}
    </div>
  );
}

export default Search;
