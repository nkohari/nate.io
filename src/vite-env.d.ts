declare module 'virtual:nateio/articles' {
  type Article = import('./types').Article;
  type ArticleModule = { default: React.FunctionComponent };

  export function getArticleContent(
    path: string
  ): React.LazyExoticComponent<React.FunctionComponent>;

  export function useArticle(path: string): Article;
  export function useArticles(): Record<string, Article>;
}
