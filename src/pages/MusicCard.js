import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    const favoritedSongs = await getFavoriteSongs();
    favoritedSongs.forEach((song) => {
      this.setState((prevState) => ({
        favoriteCards: [...prevState.favoriteCards, song.trackId],
      }));
    });
  }

  // saveFavoriteSong = async (song) => {
  //   await addSong(song);
  //   this.setState((prevState) => ({
  //     isLoading: false,
  //     favoriteCards: [...prevState.favoriteCards, song.trackId],
  //   }));
  // }

  // removeFavoriteSong = async (song) => {
  //   await removeSong(song);
  //   this.setState((prevState) => ({
  //     isLoading: false,
  //     favoriteCards: [...prevState.favoriteCards.filter((id) => song.trackId !== id)],
  //   }));
  // }

  updateFavorites = (music) => {
    const { updateFavoriteSongs,
      favoriteSongs,
      removeFavoriteSong,
      saveFavoriteSong } = this.props;
    if (!favoriteSongs.includes(music.trackId)) {
      saveFavoriteSong(music);
    } else {
      removeFavoriteSong(music);
    }
  }

  render() {
    const { musicsList, updateFavoriteSongs, favoriteSongs, isLoading} = this.props;
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
                    onClick={ () => this.updateFavorites(music) }
                    checked={ favoriteSongs.includes(music.trackId) }
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
