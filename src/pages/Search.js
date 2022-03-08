import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import NotFound from './NotFound';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      isButtonDesabled: true,
      serchedAlbums: [],
      isLoading: false,
      isSerched: false,
    };
  }

  getAlbums = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { searchText } = this.state;
    const albums = await searchAlbumsAPI(searchText);

    this.setState({
      isButtonDesabled: true,
      serchedAlbums: albums,
      isLoading: false,
      isSerched: true,
    });
  }

  validadeSearchText = (event) => {
    const { value } = event.target;
    if (value.length >= 2) {
      this.setState({
        searchText: value,
        isButtonDesabled: false,
        serchedAlbums: [],
        isSerched: false,
      });
    } else {
      this.setState({
        searchText: value,
        isButtonDesabled: true,
        serchedAlbums: [],
        isSerched: false,
      });
    }
  }

  render() {
    const { isSerched, isLoading,
      serchedAlbums, searchText, isButtonDesabled } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          {isLoading
            ? <Loading />
            : (
              <div>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.validadeSearchText }
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ isButtonDesabled }
                  onClick={ this.getAlbums }
                >
                  Pesquisar
                </button>
              </div>
            )}
          <div>
            { isSerched && serchedAlbums.length === 0 && <NotFound /> }

            {serchedAlbums.length > 0
            && (
              <div>
                <h1>
                  { `Resultado de álbuns de: ${searchText}`}
                </h1>
                {serchedAlbums.map((album) => (
                  <div key={ album.collectionName }>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt="Album" />
                      <h2>{ album.collectionName }</h2>
                      <p>{ album.artistName }</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </form>
      </div>
    );
  }
}

export default Search;
