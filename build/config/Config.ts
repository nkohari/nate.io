export type Config = {
  baseUrl: string;
  spotify: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};
