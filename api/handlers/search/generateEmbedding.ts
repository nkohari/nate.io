import { Environment } from '../../Environment';

const EMBEDDING_MODEL = '@cf/baai/bge-small-en-v1.5';

function isAsyncResponse(result: any): result is Ai_Cf_Baai_Bge_Small_En_V1_5_AsyncResponse {
  return 'request_id' in result;
}

export async function generateEmbedding(request: Request, env: Environment): Promise<Response> {
  const url = new URL(request.url);
  const text = url.searchParams.get('q');

  if (!text || text.length < 3) {
    return new Response('Bad request', { status: 400 });
  }

  const result = await env.AI.run(EMBEDDING_MODEL, {
    pooling: 'mean',
    normalize: true,
    text,
  });

  if (isAsyncResponse(result) || !result.data) {
    return new Response('Internal server error', { status: 500 });
  }

  return Response.json({ embedding: result.data[0] });
}
