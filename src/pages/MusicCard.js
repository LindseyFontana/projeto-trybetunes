import React from 'react';
import { PropTypes } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicsList } = this.props;
    return (
      <div>
        {musicsList
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
