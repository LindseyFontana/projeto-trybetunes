import React from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      album: '',
      musics: [],
    };
  }

  async componentDidMount() {
    const { params: { id } } = this.props.match;
    const musics = await getMusics(id);
    // const albumInfos = musics
    this.setState({
      id: id,
      album: musics[0],
      musics: musics,
    });
  }

  render() {
    const { musics, album } = this.state;
    return (
      <div>
        <img src={ album.artworkUrl100 } alt="Album" />
        <h2 data-testid="album-name">{ album.collectionName }</h2>
        <p data-testid="artist-name">{ album.artistName }</p>
        <div>
          <MusicCard musicsList={ musics } />
        </div>
      </div>
    );
  }
}

export default Album;
