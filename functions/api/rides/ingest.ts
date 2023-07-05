import {createJsonResponse} from '../../common/createJsonResponse';
import {Ride} from '../../../src/types';

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

async function saveRideToKV(env: Env, ride: Ride): Promise<Ride[]> {
  // Read the existing values from KV.
  const existingRides = await env.HEALTH.get<Ride[]>('rides', {type: 'json'});

  // Create a hash from the existing rides to ensure that we don't inadvertently save duplicates.
  const hash = existingRides.reduce((result, ride) => {
    result[ride.id] = ride;
    return result;
  }, {} as {[id: string]: Ride});

  // Add the ride to the hash.
  hash[ride.id] = ride;

  // Sort the values of the hash by timestamp.
  const rides = Object.values(hash).sort(
    (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp)
  );

  // Write the values back to KV.
  await env.HEALTH.put('rides', JSON.stringify(rides));

  return rides;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const {env, request} = context;
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (challenge && token === env.STRAVA_VERIFY_TOKEN) {
      return createJsonResponse({'hub.challenge': challenge});
    }
  }

  if (request.method === 'POST') {
    const {object_id, object_type} = await request.json<any>();

    if (object_type === 'activity') {
      const ride = await getRideFromStrava(env, object_id);
      await saveRideToKV(env, ride);
      return createJsonResponse(ride);
    }
  }

  return new Response('Bad request', {status: 400});
};
