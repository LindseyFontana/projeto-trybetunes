import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      isButtonDesabled: true,
    };
  }

  validadeSearchText = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState({
        searchText: value,
        isButtonDesabled: false,
      });
    } else {
      this.setState({
        searchText: value,
        isButtonDesabled: true,
      });
    }
  }

  render() {
    const { isButtonDesabled } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            type="text"
            name="search"
            data-testid="search-artist-input"
            onChange={ this.validadeSearchText }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDesabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
