import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  render() {
    const { removeFavoriteSong, updateFavoriteSongs, isLoading, favoriteSongs } = this.props;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <p>Músicas Favoritas: </p>
        <div className="favorite-music">
          {isLoading
            ? <Loading />
            : favoriteSongs
              .map((music, index) => (
                <div key={ index } className="music">
                  <p className="music-name">{music.musicName}</p>
                  <div className="audio-favorited">
                    <audio
                      className="audio"
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
                    <label htmlFor="favorite-music" className="favorited">
                      <input
                        type="checkbox"
                        id={ `${music.trackId}` }
                        name="favorite-music"
                        data-testid={ `checkbox-music-${music.trackId}` }
                        onClick={ updateFavoriteSongs }
                        checked
                      />
                    </label>
                  </div>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
