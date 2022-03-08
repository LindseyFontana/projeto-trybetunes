import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { musicsList } = this.props;
    console.log(musicsList);
    return (
      <div>
        {musicsList
          .filter((music) => music.wrapperType === 'track')
          .map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                {' '}
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                ..
              </audio>
            </div>
          ))}
      </div>
    );
  }
}

export default MusicCard;
