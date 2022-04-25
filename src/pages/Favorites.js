import React from 'react';
import Loading from './Loading';
import './style/Favorites.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
    };
  }

  reduceAlbumName = (albumName) => {
    const newAlbumName = albumName.slice(0, 20);
    return `${newAlbumName}...`;
  }

  componentDidMount = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  }

  update = async (event) => {
    const { updateFavoriteSongs } = this.props;
    await updateFavoriteSongs(event);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  }

  render() {
    const { isLoading } = this.props;
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <p>Músicas Favoritas: </p>
        <div className="favorite-music-container">
          {isLoading
            ? <Loading />
            : favoriteSongs
              .map((music, index) => (
                <div key={ index } className="favorite-music">
                  <img
                    src={ music.image }
                    alt="Capa album"
                    className="favorite-music-image"
                  />
                  <p className="favorite-music-name">
                    { music.musicName.length > 20
                      ? this.reduceAlbumName(music.musicName)
                      : music.musicName }
                  </p>
                  <div className="favorite-music-audio">
                    <audio
                      className="music-audio"
                      data-testid="audio-component"
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
                      data-testid={ `checkbox-music-${music.trackId}` }
                      onClick={ this.update }
                      checked={ favoriteSongs.includes(music.trackId) }
                    />
                  </label>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
