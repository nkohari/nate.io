import toSource from 'to-source';
import { Article } from '../../src/types';
import { ArticleBuildInfo } from '../types';

const buildArticlesHash = (articles: ArticleBuildInfo[]): string => {
  return toSource(
    articles.reduce((hash, article) => {
      const { chunkId, metadata, path } = article;
      hash[path] = { chunkId, metadata, path };
      return hash;
    }, {} as Record<string, Article>)
  );
};

const buildModulesHash = (articles: ArticleBuildInfo[]): string => {
  const imports = articles.map(
    (article) => `'${article.path}': () => import('${article.filename}'),`
  );
  return ['{', ...imports, '}'].join('\n');
};

type ArticleManifestTemplateProps = {
  articles: ArticleBuildInfo[];
};

export const catalog = ({ articles }: ArticleManifestTemplateProps) =>
  `import { useReducer } from 'react';

  export let __articles__ = ${buildArticlesHash(articles)};
  export let __modules__ = ${buildModulesHash(articles)};

  export let useArticles = () => __articles__;

  export const useArticle = (path) => {
    const articles = useArticles();
    return articles[path];
  };

  export const getArticleModule = (path) => {
    return __modules__[path];
  };

  if (import.meta.hot) {
    useArticles = () => {
      const [, forceUpdate] = useReducer((x) => x + 1, 0);

      if (import.meta.hot) {
        import.meta.hot.accept((newModule) => {
          __articles__ = newModule.__articles__;
          __modules__ = newModule.__modules__;
          forceUpdate();
        });
      }

      return __articles__;
    };
  }`;
