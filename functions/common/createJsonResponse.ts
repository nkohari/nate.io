export function createJsonResponse(data: any): Response {
  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const headers = {'Content-Type': 'application/json'};
  return new Response(json, {headers});
}
