import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Loading from './Loading';
import './style/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
    };
  }

  render() {
    const { musicsList,
      updateFavoriteSongs,
      favoriteSongs,
      isLoading,
      reduceAlbumName,
    } = this.props;
    // const { user } = this.context;
    return (
      <div className="musics-album">
        {/* {!user && <Redirect to="/" />} */}

        {isLoading
          ? <Loading />
          : musicsList
            .map((music, index) => (
              <div key={ index } className="music-container">
                <p className="music-name">
                  { music.musicName.length > 20
                    ? reduceAlbumName(music.musicName)
                    : music.musicName }
                </p>
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
                <label htmlFor="checkbox-music" className="checkbox-music">
                  <input
                    type="checkbox"
                    id={ `${music.trackId}` }
                    name="checkbox-music"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onClick={ () => updateFavoriteSongs(event, music) }
                    checked={ favoriteSongs
                      .some((song) => song.trackId === music.trackId) }
                  />
                </label>
              </div>
            ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsList: PropTypes.arrayOf(PropTypes.shape({
    preview: PropTypes.string.isRequired,
    musicName: PropTypes.string.isRequired,
  })).isRequired,
  updateFavoriteSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  favoriteSongs: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
