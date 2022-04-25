import React from 'react';
import Loading from './Loading';
import './style/Favorites.css';

class Favorites extends React.Component {
  reduceAlbumName = (albumName) => {
    const newAlbumName = albumName.slice(0, 20);
    return `${newAlbumName}...`;
  }

  render() {
    const { updateFavoriteSongs,
      isLoading,
      favoriteSongs,
    } = this.props;

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
                      onClick={ updateFavoriteSongs }
                      checked
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
