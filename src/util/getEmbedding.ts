const cache = new Map<string, number[]>();

export async function getEmbedding(text: string) {
  if (cache.has(text)) {
    return cache.get(text);
  }

  const response = await fetch(`/api/search/embed?q=${text}`);
  const { embedding } = await response.json();

  cache.set(text, embedding);

  return embedding;
}
