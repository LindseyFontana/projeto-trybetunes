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

// MusicCard.propTypes = {
//   musicsList: PropTypes.shape({
//     musicsList: PropTypes.shape({

//     })
//   }).isRequired;
// };

export default MusicCard;
