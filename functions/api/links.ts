import {callRaindropApi} from '../common/callRaindropApi';
import {createJsonResponse} from '../common/createJsonResponse';
import {LinkCollection} from '../../src/types';

type Env = {
  CACHE: KVNamespace;
  RAINDROP_TOKEN: string;
};

type LinkCollectionsHash = {[name: string]: LinkCollection};

type GetCollectionsResponseItem = {
  _id: string;
  public: boolean;
  title: string;
};

type GetCollectionsResponse = {
  items: GetCollectionsResponseItem[];
};

type GetLinksResponseItem = {
  _id: string;
  collectionId: string;
  excerpt: string;
  link: string;
  note: string;
  removed: boolean;
  title: string;
};

type GetLinksResponse = {
  items: GetLinksResponseItem[];
};

async function loadLinkCollectionsFromRaindrop(token: string) {
  const collectionsResponse = await callRaindropApi<GetCollectionsResponse>({
    path: '/collections',
    token,
  });

  const linksResponse = await callRaindropApi<GetLinksResponse>({
    path: '/raindrops/0',
    token,
  });

  const collections: {[id: string]: LinkCollection} = {};
  for (const item of collectionsResponse.items) {
    if (item.public) {
      collections[item._id] = {
        id: item._id,
        links: [],
        title: item.title,
      };
    }
  }

  for (const item of linksResponse.items) {
    const collection = collections[item.collectionId];
    if (collection && !item.removed) {
      collection.links.push({
        id: item._id,
        excerpt: item.excerpt,
        note: item.note,
        title: item.title,
        url: item.link,
      });
    }
  }

  return collections;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const {env} = context;

  let collections = await env.CACHE.get<LinkCollectionsHash>('links', {type: 'json'});

  if (!collections) {
    collections = await loadLinkCollectionsFromRaindrop(env.RAINDROP_TOKEN);
    await env.CACHE.put('links', JSON.stringify(collections));
  }

  return createJsonResponse(collections);
};
