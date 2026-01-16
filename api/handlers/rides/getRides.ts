import { Ride } from '../../../src/types';
import { Environment } from '../../Environment';

export async function getRides(env: Environment): Promise<Response> {
  const rides = await env.CACHE.get<Ride[]>('rides', { type: 'json' });
  return Response.json(rides);
}
