import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoritedSongs: [],
    };
  }

  componentDidMount = async () => {
    const favoritedSongs = await getFavoriteSongs();
    favoritedSongs.forEach((song) => {
      this.setState((prevState) => ({
        isLoading: false,
        favoritedSongs: [...prevState.favoritedSongs, song.trackId],
      }));
    });
  }

  updateFavoriteSongs = async (event) => {
    const { musicsList } = this.props;
    const { favoriteCards } = this.state;
    const clickedSong = musicsList
      .find((music) => music.trackId === parseInt(event.target.id, 10));
    this.setState({
      isLoading: true,
    });
    if (!favoriteCards.includes(clickedSong.trackId)) {
      await this.saveFavoriteSong(clickedSong);
    } else {
      await this.removeFavoriteSong(clickedSong);
    }
  }

  saveFavoriteSong = async (song) => {
    await addSong(song);
    this.setState((prevState) => ({
      isLoading: false,
      favoriteCards: [...prevState.favoriteCards, song.trackId],
    }));
  }

  removeFavoriteSong = async (song) => {
    await removeSong(song);
    this.setState((prevState) => ({
      isLoading: false,
      favoriteCards: [...prevState.favoriteCards.filter((id) => song.trackId !== id)],
    }));
  }

  render() {
    const { favoritedSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <p>Músicas Favoritas: </p>
        <div className="favorite-music">
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
                        name="favorite-music"
                        data-testid={ `checkbox-music-${music.trackId}` }
                        onClick={ this.updateFavoriteSongs }
                        checked={ favoriteCards.includes(music.trackId) }
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
