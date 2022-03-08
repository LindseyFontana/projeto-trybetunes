import React from 'react';
import { PropTypes } from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

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
        preview: music.previewUrl,
        musicName: music.trackName,
      }));
    this.setState({
      album: musicsInfos[0],
      musics: tracks,
    });
  }

  render() {
    const { musics, album } = this.state;

    return (
      <div data-testid="page-album">
        { musics.length > 0
        && (
          <div>
            <img src={ album.artworkUrl100 } alt="Album" />
            <h2 data-testid="album-name">{ album.collectionName }</h2>
            <p data-testid="artist-name">{ album.artistName }</p>
            <div>
              <MusicCard musicsList={ musics } />
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
};

export default Album;
