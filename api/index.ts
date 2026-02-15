import { getArticle } from '@apocrypha/core/catalog';
import { META_PLACEHOLDER } from 'src/constants';
import { Metadata } from 'src/types';
import { Environment } from './Environment';
import { generateMetaTags } from './generateMetaTags';
import { getRides } from './handlers/rides/getRides';
import { ingestRides } from './handlers/rides/ingestRides';
import { generateEmbedding } from './handlers/search/generateEmbedding';

export default {
  async fetch(request: Request, env: Environment, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (url.pathname.startsWith('/api/')) {
      let response: Response;

      if (url.pathname === '/api/rides' && request.method === 'GET') {
        response = await getRides(env);
      } else if (url.pathname === '/api/rides/ingest') {
        response = await ingestRides(request, env);
      } else if (url.pathname === '/api/search/embed' && request.method === 'GET') {
        response = await generateEmbedding(request, env);
      } else {
        response = new Response('Not Found', { status: 404 });
      }

      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Max-Age', '86400');

      return response;
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('text/html')) {
      const article = getArticle<Metadata>(url.pathname);

      if (article) {
        const metaTags = generateMetaTags(url, article.metadata);
        return new HTMLRewriter()
          .on('head', {
            comments(comment) {
              if (comment.text.trim() === META_PLACEHOLDER) {
                comment.replace(metaTags, { html: true });
              }
            },
          })
          .transform(response);
      }
    }

    return response;
  },
};
