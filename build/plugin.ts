import path from 'path';
import { ResolvedConfig } from 'vite';
import { CatalogBuilder } from './CatalogBuilder';
import { ArticleFactory } from './ArticleFactory';
import { MarkdocParser } from './MarkdocParser';
import { MarkdocTagRegistration, MetadataPlugin } from './types';
import * as templates from './templates';

const CATALOG_MODULE_ID = 'virtual:nateio/articles';
const VIRTUAL_MODULE_PREFIX = '/@nateio/';
const ARTICLE_FILENAME_PATTERN = /\.md/;

const prefix = (moduleName: string) => VIRTUAL_MODULE_PREFIX + moduleName;

export type MarkdocPluginOptions = {
  componentsPath: string;
  contentPath: string;
  tags: Record<string, MarkdocTagRegistration>;
  metadataPlugins: MetadataPlugin[];
};

export function nateio(options: MarkdocPluginOptions) {
  let catalogBuilder: CatalogBuilder = null;
  let config: ResolvedConfig = null;
  let invalidateCatalogModule = null;
  let reactRefreshPlugin = null;

  const basePath = process.cwd();
  const componentsPath = path.resolve(basePath, options.componentsPath) + '/';
  const contentPath = path.resolve(basePath, options.contentPath) + '/';

  const markdocParser = new MarkdocParser({ tags: options.tags });
  const articleFactory = new ArticleFactory({
    contentPath,
    markdocParser,
    metadataPlugins: options.metadataPlugins,
  });

  return {
    name: 'vite-plugin-nateio',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
      reactRefreshPlugin = config.plugins.find((plugin) => plugin.name === 'vite:react-babel');

      catalogBuilder = new CatalogBuilder({
        contentPath,
        articleFactory,
        watchForChanges: config.command === 'serve',
      });

      if (config.command === 'serve') {
        const handleCatalogChange = () => {
          if (invalidateCatalogModule) invalidateCatalogModule();
        };
        catalogBuilder.on('add', handleCatalogChange);
        catalogBuilder.on('change', handleCatalogChange);
        catalogBuilder.on('remove', handleCatalogChange);
      }
    },
    async buildStart() {
      return catalogBuilder.start();
    },
    async buildEnd() {
      return catalogBuilder?.stop();
    },
    configureServer({ watcher, moduleGraph }) {
      invalidateCatalogModule = () => {
        const moduleName = prefix(CATALOG_MODULE_ID);
        const catalogModule = moduleGraph.getModuleById(moduleName);
        if (catalogModule) {
          moduleGraph.invalidateModule(catalogModule);
          watcher.emit('change', moduleName);
        }
      };
    },
    resolveId(id: string) {
      if (id === CATALOG_MODULE_ID) return prefix(CATALOG_MODULE_ID);
    },
    async load(id: string) {
      if (id === prefix(CATALOG_MODULE_ID)) {
        return templates.catalog({ articles: catalogBuilder.read() });
      }
    },
    async transform(text: string, id: string) {
      if (!ARTICLE_FILENAME_PATTERN.test(id)) return;

      const ast = markdocParser.parse(text);
      const content = markdocParser.transform(ast);
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
