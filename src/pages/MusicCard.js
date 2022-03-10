import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './style/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoriteCards: [],
    };
  }

  componentDidMount = async () => {
    const favoritedSongs = await getFavoriteSongs();
    favoritedSongs.forEach((song) => {
      this.setState((prevState) => ({
        isLoading: false,
        favoriteCards: [...prevState.favoriteCards, song.trackId],
      }));
    });
  }

  saveFavorite = async (event) => {
    const { musicsList } = this.props;
    const { favoriteCards } = this.state;
    const favorited = musicsList
      .find((music) => music.trackId === parseInt(event.target.id, 10));
    this.setState({
      isLoading: true,
    });
    if (!favoriteCards.includes(favorited.trackId)) {
      await addSong(favorited);
      this.setState((prevState) => ({
        isLoading: false,
        favoriteCards: [...prevState.favoriteCards, favorited.trackId],
      }));
    }
  }

  render() {
    const { musicsList } = this.props;
    const { favoriteCards, isLoading } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : musicsList
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
                      data-testid={ `checkbox-music-${music.trackId}` }
                      onClick={ this.saveFavorite }
                      checked={ favoriteCards.includes(music.trackId) }
                    />
                  </label>
                </div>
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
