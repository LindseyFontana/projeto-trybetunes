import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import './style/MusicCard.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicsInfos = await getMusics(id);
    const tracks = musicsInfos
      .filter((music) => Object.keys(music).includes('trackName'))
      .map((music) => ({
        image: music.artworkUrl100,
        preview: music.previewUrl,
        musicName: music.trackName,
        trackId: music.trackId,
      }));
    this.setState({
      album: musicsInfos[0],
      musics: tracks,
    });
  }

  render() {
    const {
      updateFavoriteSongs,
      favoriteSongs,
      isLoading,
      reduceAlbumName,
    } = this.props;

    const { musics, album } = this.state;
    // const { user } = this.context;
    return (
      <div data-testid="page-album">
        {/* {!user && <Redirect to="/" />} */}

        { musics.length > 0
        && (
          <div className="music-card">
            <div className="album-musics">
              <img
                className="album-musics-image"
                src={ album.artworkUrl100 }
                alt="Album"
              />
              <h2 data-testid="album-name" className="album-musics-name">
                { album.collectionName }
              </h2>
              <p data-testid="artist-name" className="artist-musics-name">
                { album.artistName }
              </p>
            </div>
            <div>
              <MusicCard
                musicsList={ musics }
                updateFavoriteSongs={ updateFavoriteSongs }
                favoriteSongs={ favoriteSongs }
                isLoading={ isLoading }
                reduceAlbumName={ reduceAlbumName }
              />
            </div>
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }) }).isRequired,
  updateFavoriteSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  favoriteSongs: PropTypes.arrayOf.isRequired,
};

export default Album;
