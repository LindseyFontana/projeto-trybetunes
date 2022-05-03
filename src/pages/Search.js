import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import NotFound from './NotFound';
import './style/Search.css';
import { AiOutlineSearch } from "react-icons/ai";

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

  reduceAlbumName = (albumName) => {
    const newAlbumName = albumName.slice(0, 20);
    return `${newAlbumName}...`;
  }

  reduceArtistName = (albumName) => {
    const newAlbumName = albumName.slice(0, 20);
    return `${newAlbumName}...`;
  }

  render() {
    const { isSerched, isLoading,
      serchedAlbums, searchText, isButtonDesabled } = this.state;
    return (
      <form data-testid="page-search" className="conteiner-search">
        {isLoading
          ? <Loading />
          : (
            <div className="search-container">
              <input
                type="text"
                data-testid="search-artist-input"
                className="search-input"
                placeholder={ "Nome do artista" <AiOutlineSearch /> }
                onChange={ this.validadeSearchText }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                className="search-button"
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
              <div className="search-result">
                <h1 className="search-title">
                  { `Resultado de álbuns de Artista: ${searchText}`}
                </h1>
                <div className="searched-albuns">
                  {serchedAlbums.map((album) => (
                    <div key={ album.collectionName } className="album">
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt="Album"
                          className="img-album"
                        />
                        <h2
                          className="collection-name"
                        >
                          { album.collectionName.length > 20
                            ? this.reduceAlbumName(album.collectionName)
                            : album.collectionName }
                        </h2>
                        <p className="artist-name">
                          { album.artistName.length > 20
                            ? this.reduceArtistName(album.artistName)
                            : album.artistName }
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

      </form>
    );
  }
}

export default Search;
