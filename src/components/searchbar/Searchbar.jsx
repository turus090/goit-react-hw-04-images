import propTypes from 'prop-types'
import s from './searchbar.module.css';
import {useState} from 'react';

const Searchbar = ({submitSearch}) =>{
  const [searchText, setSearchText] = useState("")
  const updateSearch = (newValue) => {
    setSearchText(newValue);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
   submitSearch(searchText);
  }
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.searchPanel}>
        <input
          value={searchText}
          className={s.searchInput}
          placeholder="entry text"
          onChange={e => {
            updateSearch(e.target.value);
          }}
        />
        <button type="submit">search</button>
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  submitSearch: propTypes.func
}

export default Searchbar;
