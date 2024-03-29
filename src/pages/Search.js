import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Button from './components/Button';
import Input from './components/Input';
import './style/Search.css';
import { getUser } from '../services/userAPI';

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

  thereIsLogin = () => {
    const userSaved = getUser();
    if (userSaved !== {}) return false;
    return true;
  }

  render() {
    const { isSerched, isLoading,
      serchedAlbums, searchText, isButtonDesabled } = this.state;
    return (

      <form data-testid="page-search" className="conteiner-search">
      {!this.thereIsLogin && <Redirect to="/" />}
        {isLoading
          ? <Loading />
          : (
            <div className="search-container">
              <Input
                buttonType="text"
                testId="search-artist-input"
                classStyle="search-input"
                placeHolder="Artist name"
                onChange={ this.validadeSearchText }
              />
              <Button
                buttonType="submit"
                testId="search-artist-button"
                name="search-button"
                isDesabled={ isButtonDesabled }
                text="Search"
                clickFunction={ this.getAlbums }
                isLoading={ isLoading }
              />
            </div>
          )}
        <div>
          { isSerched
          && serchedAlbums.length === 0
          && <p>Nenhum álbum foi encontrado</p> }

          { serchedAlbums.length > 0
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
