import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './components/Loading';
import Button from './components/Button';
import Input from './components/Input';
import './style/Search.css';

const maxNumberCharacteres = 20;

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
    const newAlbumName = albumName.slice(0, maxNumberCharacteres);
    return `${newAlbumName}...`;
  }

  reduceArtistName = (albumName) => {
    const newAlbumName = albumName.slice(0, maxNumberCharacteres);
    return `${newAlbumName}...`;
  }

  render() {
    const { isSerched, isLoading,
      serchedAlbums, isButtonDesabled } = this.state;
    return (
      <form className="conteiner-search">
        {isLoading
          ? <Loading />
          : (
            <div className="search-container">
              <Input
                buttonType="text"
                testId="search-artist-input"
                classStyle="search-input"
                placeHolder="Nome do artista"
                onChange={ this.validadeSearchText }
              />
              <Button
                buttonType="submit"
                testId="search-artist-button"
                name="search-button"
                isDesabled={ isButtonDesabled }
                text="Pesquisar"
                clickFunction={ this.getAlbums }
                isLoading={ isLoading }
              />
            </div>
          )}
        <div>
          { isSerched
          && serchedAlbums.length === 0
          && <p className="albumNotFound">Nenhum álbum encontrado.</p> }

          { serchedAlbums.length > 0
            && (
              <div className="search-result">
                <div className="searched-albuns">
                  {serchedAlbums.map((album) => (
                    <div key={ album.collectionName } className="album">
                      <Link
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
                          { album.collectionName.length > maxNumberCharacteres
                            ? this.reduceAlbumName(album.collectionName)
                            : album.collectionName }
                        </h2>
                        <p className="artist-name">
                          { album.artistName.length > maxNumberCharacteres
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
