import {createJsonResponse} from '../../common/createJsonResponse';
import {Ride} from '../../../src/types';

type Env = {
  HEALTH: KVNamespace;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const {env} = context;
  const rides = await env.HEALTH.get<Ride[]>('rides', {type: 'json'});
  return createJsonResponse(rides);
};
