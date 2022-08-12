import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import './style/Favorites.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      reduceAlbumName,
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
    const { user } = this.context;

    return (
      <div data-testid="page-favorites" className="page-favorites">
        <div className="favorite-music-container">
          {isLoading && <Loading /> }

          {!isLoading && favoriteSongs.length === 0

          && <p className="no-favorite-song">There aren't favorite songs</p> }

          {
            !isLoading && favoriteSongs.length !== 0
            && favoriteSongs
              .map((music, index) => (
                <div key={ index } className="favorite-music">
                  <img
                    src={ music.image }
                    alt="Capa album"
                    className="favorite-music-image"
                  />
                  <p className="favorite-music-name">
                    { music.musicName.length > 20
                      ? reduceAlbumName(music.musicName)
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
                      checked={ !favoriteSongs.includes(music.trackId) }
                    />
                  </label>
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
