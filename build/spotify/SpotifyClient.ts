/* eslint-disable @typescript-eslint/no-explicit-any */

import {SpotifyObject} from '../../src/types';
import {Config} from '../config';
import {transformAlbum, transformArtist, transformTrack} from './transformers';

type RequestProps<T> = {
  path: string;
  transformer: (json: any) => T;
};

type Identifier = string | SpotifyObject;

function normalize(identifier: Identifier) {
  return typeof identifier === 'string' ? identifier : identifier.id;
}

export class SpotifyClient {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getAlbum(id: Identifier) {
    return this.request({
      path: `/v1/albums/${normalize(id)}`,
      transformer: transformAlbum,
    });
  }

  getAlbums(ids: Identifier[]) {
    return this.request({
      path: `/v1/albums?ids=${ids.map(normalize).join(',')}`,
      transformer: (input: any) => input.albums.map(transformAlbum),
    });
  }

  getArtist(id: Identifier) {
    return this.request({
      path: `/v1/artists/${normalize(id)}`,
      transformer: transformArtist,
    });
  }

  getArtists(ids: Identifier[]) {
    return this.request({
      path: `/v1/artists?ids=${ids.map(normalize).join(',')}`,
      transformer: (input: any) => input.artists.map(transformArtist),
    });
  }

  getTrack(id: Identifier) {
    return this.request({
      path: `/v1/tracks/${normalize(id)}`,
      transformer: transformTrack,
    });
  }

  getTracks(ids: Identifier[]) {
    return this.request({
      path: `/v1/tracks?ids=${ids.map(normalize).join(',')}`,
      transformer: (input: any) => input.tracks.map(transformTrack),
    });
  }

  getAuthorizeUrl() {
    const url = new URL('https://accounts.spotify.com/authorize');
    const scopes = ['user-read-currently-playing', 'user-top-read'];

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', this.config.spotify.clientId);
    url.searchParams.set('scope', scopes.join(' '));
    url.searchParams.set('redirect_uri', `${this.config.baseUrl}/spotify/auth`);

    return url.toString();
  }

  async getTokens(code: string) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: this.config.spotify.clientId,
        client_secret: this.config.spotify.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${this.config.baseUrl}/spotify/auth`,
      }),
    });

    return response.json();
  }

  private async request<T>({path, transformer}: RequestProps<T>): Promise<T | null> {
    const {access_token} = await this.getAccessToken();

    console.log('[spotify] GET %o', path);

    const url = new URL(path, 'https://api.spotify.com/');
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    let result;
    if (response.status === 204) {
      result = null;
    } else {
      const data = await response.json();
      result = transformer(data);
    }

    return result;
  }

  private async getAccessToken() {
    const {clientId, clientSecret, refreshToken} = this.config.spotify;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    return response.json();
  }
}
