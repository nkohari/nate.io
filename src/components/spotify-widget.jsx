import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import '../css/spotify-widget.styl';

class SpotifyWidget extends React.Component {

  render() {
    const { song } = this.props;
    return (
      <div className='spotify-widget'>
        <header className='header'>
          Recommended listening
        </header>
        <iframe src={`https://open.spotify.com/embed?uri=${song}&theme=white`} />
      </div>
    );
  }

}

export default SpotifyWidget;
