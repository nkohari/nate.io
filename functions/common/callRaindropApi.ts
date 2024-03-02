const RAINDROP_BASE_URL = 'https://api.raindrop.io/rest/v1';

type CallRaindropApiParams = {
  body?: any;
  path: `/${string}`;
  token: string;
};

export async function callRaindropApi<T>({body, path, token}: CallRaindropApiParams): Promise<T> {
  const response = await fetch(RAINDROP_BASE_URL + path, {
    body: body ?? JSON.stringify(body),
    method: body ? 'post' : 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json<T>();
}
