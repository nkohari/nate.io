import React from 'react';
import '../css/spotify-widget.styl';

export const SpotifyWidget = props => {
  return (
    <div className="spotify-widget">
      <header className="header">Recommended listening</header>
      <iframe title="Spotify" src={`https://open.spotify.com/embed?uri=${props.song}&theme=white`} />
    </div>
  );
};
