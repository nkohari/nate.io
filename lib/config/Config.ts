export type Config = {
  apiBaseUrl: string;
  apiPort: number;
  baseUrl: string;
  spotify: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};
