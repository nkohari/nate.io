import fs from 'fs';
import path from 'path';
import chokidar, { FSWatcher } from 'chokidar';
import { ResolvedConfig } from 'vite';
import { ArticleFactory } from './ArticleFactory';
import { MarkdocParser } from './MarkdocParser';
import { Article, MarkdocTagRegistration, MetadataPlugin } from './types';
import * as templates from './templates';

const ARTICLES_MODULE_ID = 'virtual:nateio/articles';
const VIRTUAL_MODULES_RESOLVE_PREFIX = '/@nateio/';
const ARTICLE_FILENAME_PATTERN = /\.md/;

const prefix = (moduleName: string) => VIRTUAL_MODULES_RESOLVE_PREFIX + moduleName;

export type MarkdocPluginOptions = {
  componentsPath: string;
  contentPath: string;
  tags: Record<string, MarkdocTagRegistration>;
  metadataPlugins: MetadataPlugin[];
};

export function nateio(options: MarkdocPluginOptions) {
  let articleWatcher: FSWatcher = null;
  let config: ResolvedConfig = null;
  let invalidateArticlesModule = null;
  let reactRefreshPlugin = null;

  const basePath = process.cwd();
  const componentsPath = path.resolve(basePath, options.componentsPath) + '/';
  const contentPath = path.resolve(basePath, options.contentPath) + '/';

  const articleFactory = new ArticleFactory(contentPath, options.metadataPlugins);
  const markdoc = new MarkdocParser(options.tags);

  const articles: Record<string, Article> = {};

  return {
    name: 'vite-plugin-nateio',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
      reactRefreshPlugin = config.plugins.find((plugin) => plugin.name === 'vite:react-babel');
    },
    async buildStart() {
      const updateArticle = async (filename: string) => {
        const { id } = await this.resolve(filename);

        const text = await fs.promises.readFile(id, { encoding: 'utf8' });
        const ast = markdoc.parse(text);
        const article = articleFactory.createArticle(id, ast);

        const previous = articles[article.path];
        const changed = !previous || previous.hash !== article.hash;

        articles[article.path] = article;

        if (invalidateArticlesModule && changed) {
          invalidateArticlesModule();
        }
      };

      return new Promise<void>((resolve) => {
        articleWatcher = chokidar.watch(`${contentPath}**/*.md`, {
          persistent: config.command === 'serve',
        });

        articleWatcher.on('add', updateArticle);
        articleWatcher.on('change', updateArticle);
        articleWatcher.on('ready', resolve);
      });
    },
    buildEnd() {
      articleWatcher?.close();
    },
    configureServer({ watcher, moduleGraph }) {
      invalidateArticlesModule = () => {
        const moduleName = prefix(ARTICLES_MODULE_ID);
        const articlesModule = moduleGraph.getModuleById(moduleName);
        if (articlesModule) {
          moduleGraph.invalidateModule(articlesModule);
          watcher.emit('change', moduleName);
        }
      };
    },
    resolveId(id: string) {
      if (id === ARTICLES_MODULE_ID) return prefix(ARTICLES_MODULE_ID);
    },
    async load(id: string) {
      if (id === prefix(ARTICLES_MODULE_ID)) {
        return templates.articleManifest({ articles, basePath });
      }
    },
    async transform(text: string, id: string) {
      if (!ARTICLE_FILENAME_PATTERN.test(id)) return;

      const ast = markdoc.parse(text);
      const content = markdoc.transform(ast);
      const code = templates.article({ componentsPath, content });

      // HACK: @vitejs/plugin-react automatically supports Fast Refresh for all modules which
      // export only React components and which have a /[j|t]sx?/ extension. The article
      // modules export React components which are compatible with Fast Refresh, but because
      // their extension is .md, they won't be automatically transformed. There's no easy
      // way to change this via configuration, so instead we yank the transform() function
      // out of the plugin and call it directly with a fake .js extension. This adds the
      // wrapper which is necessary to make Fast Refresh work.
      const result = await reactRefreshPlugin?.transform!.call(this, code, `${id}.js`, false);

      return result || { code };
    },
  };
}
