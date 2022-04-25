import React from 'react';
import { PropTypes } from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './style/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteCards: [],
    };
  }

  componentDidMount = async () => {
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      this.setState((prevState) => ({
        favoriteCards: [...prevState.favoriteCards, song],
      }));
    });
  }

  render() {
    const { musicsList, updateFavoriteSongs, isLoading} = this.props;
    const { favoriteCards } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : musicsList
            .map((music, index) => (
              <div key={ index } className="music-container">
                <p className="music-name">{music.musicName}</p>
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
                <label htmlFor="checkbox-music" className="checkbox-music">
                  <input
                    type="checkbox"
                    id={ `${music.trackId}` }
                    name="checkbox-music"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onClick={ () => updateFavoriteSongs(event, music) }
                    checked={ favoriteCards.includes(music.trackId) }
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
};

export default MusicCard;
