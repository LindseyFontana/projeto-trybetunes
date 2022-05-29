import React from 'react';
import { PropTypes } from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './components/Loading';
import './style/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  }

  update = async (event) => {
    this.setState({
      isLoading: true,
    });
    const {
      updateFavoriteSongs,
    } = this.props;

    await updateFavoriteSongs(event);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    const { reduceAlbumName } = this.props;

    function renderSongs(songs, updateSong) {
      const maxCharacters = 20;
      if (songs.length === 0) {
        return <p className="favoteNotFound">Não há música favoritada.</p>;
      }
      return songs
        .map((music, index) => (
          <div key={ index } className="favorite-music">
            <img
              src={ music.image }
              alt="Capa album"
              className="favorite-music-image"
            />
            <p className="favorite-music-name">
              {music.musicName.length > maxCharacters
                ? reduceAlbumName(music.musicName)
                : music.musicName}
            </p>
            <div className="favorite-music-audio">
              <audio
                className="music-audio"
                src={ music.preview }
                controls
              >
                <track kind="captions" />
                {' '}
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                ..
              </audio>
            </div>
            <label htmlFor="favorite-music" className="favorited">
              <input
                type="checkbox"
                id={ `${music.trackId}` }
                name="favorite-music"
                onClick={ updateSong }
                checked={ !favoriteSongs.includes(music.trackId) }
              />
            </label>
          </div>
        ));
    }
    return (
      <div className="page-favorites">
        <div className="favorite-music-container">
          {isLoading
            ? <Loading />
            : renderSongs(favoriteSongs, this.update)}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  reduceAlbumName: PropTypes.func.isRequired,
  updateFavoriteSongs: PropTypes.func.isRequired,
};

export default Favorites;
