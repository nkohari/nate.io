import {createJsonResponse} from '../../common/createJsonResponse';
import {Ride} from '../../common/Ride';

type Env = {
  HEALTH: KVNamespace;
};

async function getAllRides(env: Env): Promise<Ride[]> {
  let keys = [];
  let cursor = undefined;
  let result: KVNamespaceListResult<never, string>;

  console.log('Loading rides from KV');

  do {
    result = await env.HEALTH.list({cursor, prefix: 'ride:'});
    keys = [...keys, ...result.keys.map((key) => key.name)];
  } while (!result.list_complete);

  console.log('Got ride keys: %o', keys);

  let rides = [];
  for (const key of keys) {
    const ride = await env.HEALTH.get(key, {type: 'json'});
    rides.push(ride);
  }

  console.log('Loaded rides');

  return rides;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const {env} = context;
  const rides = await getAllRides(env);
  return createJsonResponse(rides);
};
