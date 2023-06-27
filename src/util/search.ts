import escapeStringForRegexp from 'escape-string-regexp';
import {Article} from '@nkohari/apocrypha';
import {Metadata} from 'src/types';

export const search = (
  articles: Article<Metadata>[],
  query: string | null
): Article<Metadata>[] => {
  const isMatch = (article: Article<Metadata>) => {
    // Never match page or music articles.
    if (article.metadata.type === 'page' || article.metadata.type === 'music') return false;

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
