import {createJsonResponse} from '../../common/createJsonResponse';
import {Ride} from '../../common/Ride';

const STRAVA_REFRESH_TOKEN_KEY = 'strava-refresh-token';

type Env = {
  HEALTH: KVNamespace;
  STRAVA_CLIENT_ID: string;
  STRAVA_CLIENT_SECRET: string;
  STRAVA_VERIFY_TOKEN: string;
};

async function getStravaAccessToken(env: Env) {
  const refreshToken = await env.HEALTH.get(STRAVA_REFRESH_TOKEN_KEY);

  const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const {access_token, refresh_token} = await response.json<any>();
  if (refresh_token !== refreshToken) {
    await env.HEALTH.put(STRAVA_REFRESH_TOKEN_KEY, refresh_token);
  }

  return access_token;
}

async function getAllRidesFromStrava(env: Env): Promise<Ride[]> {
  const accessToken = await getStravaAccessToken(env);
  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=1672531200`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const results = await response.json<any>();

  return results.map((result) => ({
    id: result.id,
    timestamp: result.start_date,
    distance: result.distance,
    duration: result.moving_time,
    averageSpeed: result.average_speed,
    maxSpeed: result.max_speed,
    totalElevationGain: result.total_elevation_gain,
  }));
}

async function getRideFromStrava(env: Env, id: string): Promise<Ride> {
  const accessToken = await getStravaAccessToken(env);
  const response = await fetch(`https://www.strava.com/api/v3/activities/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json<any>();

  return {
    id: result.id,
    timestamp: result.start_date,
    distance: result.distance,
    duration: result.moving_time,
    averageSpeed: result.average_speed,
    maxSpeed: result.max_speed,
    totalElevationGain: result.total_elevation_gain,
  };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const {env, request} = context;
  const url = new URL(request.url);

  try {
    if (request.method === 'GET') {
      if (url.searchParams.has('all')) {
        const rides = await getAllRidesFromStrava(env);
        for (const ride of rides) {
          await env.HEALTH.put(`ride:${ride.id}`, JSON.stringify(ride));
        }
        return createJsonResponse(rides);
      }
      if (url.searchParams.has('id')) {
        const ride = await getRideFromStrava(env, url.searchParams.get('id'));
        return createJsonResponse(ride);
      }

      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');

      if (challenge && token === env.STRAVA_VERIFY_TOKEN) {
        return createJsonResponse({'hub.challenge': challenge});
      }
    }

    if (request.method === 'POST') {
      const {aspect_type, object_id, object_type} = await request.json<any>();

      if (aspect_type === 'create' && object_type === 'activity') {
        const ride = await getRideFromStrava(env, object_id);
        const json = JSON.stringify(ride, null, 2);
        env.HEALTH.put(`ride:${ride.id}`, json);
        return createJsonResponse(json);
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({error}), {status: 500});
  }

  return new Response('Bad request', {status: 400});
};
