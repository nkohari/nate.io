declare module 'virtual:nateio/articles' {
  type Article = import('./types').Article;
  type ArticleModule = { default: React.FunctionComponent };

  export function getArticleModule(path: string): () => Promise<ArticleModule>;
  export function useArticle(path: string): Article;
  export function useArticles(): Record<string, Article>;
}
