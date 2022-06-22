import 'dotenv/config';
import { Config } from './Config';

export * from './Config';

export const config: Config = {
  apiBaseUrl: process.env.API_BASE_URL!,
  apiPort: Number(process.env.API_PORT!),
  baseUrl: process.env.BASE_URL!,
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
  },
};
