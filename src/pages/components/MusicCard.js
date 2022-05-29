import { PropTypes } from 'prop-types';
import React from 'react';
import Loading from './Loading';
import '../style/MusicCard.css';

const maxNumberCharacteres = 20;

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
    return (
      <div className="musics-album">
        {isLoading
          ? <Loading />
          : musicsList
            .map((music, index) => (
              <div key={ index } className="music-container">
                <p className="music-name">
                  { music.musicName.length > maxNumberCharacteres
                    ? reduceAlbumName(music.musicName)
                    : music.musicName }
                </p>
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
                <label htmlFor="checkbox-music" className="checkbox-music">
                  <input
                    type="checkbox"
                    id={ `${music.trackId}` }
                    name="checkbox-music"
                    onClick={ () => updateFavoriteSongs(music) }
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
  reduceAlbumName: PropTypes.func.isRequired,
};

export default MusicCard;
