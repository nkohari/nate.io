import escapeStringForRegexp from 'escape-string-regexp';
import { Article } from 'src/types';

export const search = (
  articles: Article[],
  query: string | null,
  includeArchived: boolean
): Article[] => {
  const isMatch = (article: Article) => {
    // Never match page articles.
    if (article.metadata.type === 'page') return false;

    // If archived articles are not supposed to be included, don't match them.
    if (!includeArchived && article.metadata.state === 'archived') return false;

    // If a query string was provided, use it to match.
    if (query && query.length > 0) {
      const regexp = new RegExp(escapeStringForRegexp(query), 'i');

      const fields = [
        article.metadata.title,
        article.metadata.subtitle,
        article.metadata.category,
        article.metadata.excerpt,
      ];

      return fields.some((field) => field?.match(regexp));
    }

    return true;
  };

  return articles
    .filter(isMatch)
    .sort((a, b) => b.metadata.date!.valueOf() - a.metadata.date!.valueOf());
};
