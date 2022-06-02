import toSource from 'to-source';
import { Article } from '../types';

const buildModulesHash = (articles: Record<string, Article>) => {
  const imports = Object.entries(articles).map(
    ([path, article]) => `'${path}': () => import('${article.id}'),`
  );
  return ['{', ...imports, '}'].join('\n');
};

type ArticleManifestTemplateProps = {
  articles: Record<string, Article>;
  basePath: string;
};

export const articleManifest = ({ articles, basePath }: ArticleManifestTemplateProps) =>
  `import { useReducer } from 'react';

  export let __articles__ = ${toSource(articles)};
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
