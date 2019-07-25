import React from 'react';
import './SpotifyWidget.styl';

export const SpotifyWidget = props => {
  return (
    <div className="spotify-widget">
      <header className="header">Recommended listening</header>
      <iframe title="Spotify" src={`https://open.spotify.com/embed?uri=${props.song}`} />
    </div>
  );
};
