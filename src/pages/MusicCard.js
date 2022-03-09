import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  saveFavorite = async ({ target }) => {
    const { musicsList } = this.props;
    const favorited = musicsList
      .find((music) => music.trackId === parseInt(target.id, 10));
    this.setState({
      isLoading: true,
    });
    await addSong(favorited);
    this.setState({
      isLoading: false,
    });
    console.log(await getFavoriteSongs());
  }

  render() {
    const { musicsList } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : musicsList
            .map((music, index) => (
              <div key={ index }>
                <p>{music.musicName}</p>
                <audio data-testid="audio-component" src={ music.preview } controls>
                  <track kind="captions" />
                  {' '}
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  ..
                </audio>
                <label htmlFor="favorite-music">
                  Favorita
                  <input
                    type="checkbox"
                    id={ `${music.trackId}` }
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onClick={ this.saveFavorite }
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
