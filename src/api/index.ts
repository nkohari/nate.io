import cors from 'cors';
import express, { Request, Response } from 'express';
import { config } from 'lib/config';
import { SpotifyClient } from 'lib/spotify';

const server = express();
const spotify = new SpotifyClient(config);

server.use(
  cors({
    origin: config.baseUrl,
  })
);

if (process.env.NODE_ENV === 'development') {
  server.set('json spaces', 2);
  server.get('/spotify/auth', async (req: Request, res: Response) => {
    const { code } = req.query;
    if (typeof code === 'string') {
      const tokens = await spotify.getTokens(code);
      res.json(tokens);
    } else {
      res.redirect(spotify.getAuthorizeUrl());
    }
  });
}

server.get('/spotify/track/:id', async (req: Request, res: Response) => {
  const result = await spotify.getTrack(req.params.id);
  res.json(result);
});

server.listen(config.apiPort, () => {
  console.log(`Server now listening at ${config.apiBaseUrl}`);
});
