import propTypes from 'prop-types'
import s from './searchbar.module.css';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchText:''
  }
  updateSearch = (newValue) => {
    this.setState({searchText:newValue});
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitSearch(this.state.searchText);
  }
  render(){
    return (
      <header className={s.header}>
        <form onSubmit={this.handleSubmit} className={s.searchPanel}>
          <input
            value={this.state.search}
            className={s.searchInput}
            placeholder="entry text"
            onChange={e => {
              this.updateSearch(e.target.value);
            }}
          />
          <button type="submit">search</button>
        </form>
      </header>
    );
  }
};

Searchbar.propTypes = {
  submitSearch: propTypes.func
}

export default Searchbar;
