import escapeStringForRegexp from 'escape-string-regexp';
import { Article } from '../types';

const articleMatchesQuery = (article: Article, query: string) => {
  const regexp = new RegExp(escapeStringForRegexp(query), 'i');

  const fields = [
    article.metadata.title,
    article.metadata.subtitle,
    article.metadata.category,
    article.metadata.excerpt,
  ];

  return fields.some((field) => field?.match(regexp));
};

export const search = (
  articles: Article[],
  query: string | null,
  includeArchived: boolean
): Article[] => {
  const matches = articles.filter((article) => {
    // Never match page articles.
    if (article.metadata.type === 'page') return false;

    // If archived articles are not supposed to be included, don't match them.
    if (!includeArchived && article.metadata.state === 'archived') return false;

    // If a query string was provided, use it to match.
    if (query && query.length > 0) return articleMatchesQuery(article, query);

    return true;
  });

  return matches.sort((a, b) => b.metadata.date!.valueOf() - a.metadata.date!.valueOf());
};
