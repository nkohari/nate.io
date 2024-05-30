import { createJsonResponse } from '../../common/createJsonResponse';
import { Ride } from '../../../src/types';

type Env = {
  CACHE: KVNamespace;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const rides = await env.CACHE.get<Ride[]>('rides', { type: 'json' });
  return createJsonResponse(rides);
};
