import path from 'path';
import { Plugin, ResolvedConfig } from 'vite';
import { ArticleBuildInfoFactory } from './ArticleBuildInfoFactory';
import { CatalogBuilder } from './CatalogBuilder';
import { MarkdocParser } from './MarkdocParser';
import { MarkdocTagRegistration, MetadataPlugin } from './types';
import * as templates from './templates';

const CATALOG_MODULE_ID = 'virtual:nateio/articles';
const VIRTUAL_MODULE_PREFIX = '/@nateio/';
const ARTICLE_FILENAME_PATTERN = /\.md/;

const prefix = (moduleName: string) => VIRTUAL_MODULE_PREFIX + moduleName;

export type ContentPluginOptions = {
  componentsPath: string;
  contentPath: string;
  tags: MarkdocTagRegistration[];
  metadataPlugins: MetadataPlugin[];
};

export function ContentPlugin(options: ContentPluginOptions): Plugin {
  let config: ResolvedConfig;
  let reactRefreshPlugin: Plugin | undefined;

  const basePath = process.cwd();
  const componentsPath = path.resolve(basePath, options.componentsPath) + '/';
  const contentPath = path.resolve(basePath, options.contentPath) + '/';

  const markdocParser = new MarkdocParser({ tags: options.tags });
  const articleBuildInfoFactory = new ArticleBuildInfoFactory({
    basePath,
    contentPath,
    markdocParser,
    metadataPlugins: options.metadataPlugins,
  });
  const catalogBuilder = new CatalogBuilder({ contentPath, articleBuildInfoFactory });

  return {
    name: 'vite-plugin-nateio-content',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      reactRefreshPlugin = config.plugins.find((plugin) => plugin.name === 'vite:react-babel');
    },
    async buildEnd() {
      return catalogBuilder.stopWatching();
    },
    configureServer({ watcher, moduleGraph }) {
      const invalidateCatalogModule = () => {
        const moduleName = prefix(CATALOG_MODULE_ID);
        const catalogModule = moduleGraph.getModuleById(moduleName);
        if (catalogModule) {
          moduleGraph.invalidateModule(catalogModule);
          watcher.emit('change', moduleName);
        }
      };

      catalogBuilder.on('add', invalidateCatalogModule);
      catalogBuilder.on('change', invalidateCatalogModule);
      catalogBuilder.on('remove', invalidateCatalogModule);

      catalogBuilder.startWatching();
    },
    resolveId(id: string) {
      if (id === CATALOG_MODULE_ID) return prefix(CATALOG_MODULE_ID);
    },
    async load(id: string) {
      if (id === prefix(CATALOG_MODULE_ID)) {
        const articles = await catalogBuilder.read();
        return templates.catalog({ articles });
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
      const result = await reactRefreshPlugin?.transform!.call(this, code, `${id}.js`);

      return result || { code };
    },
  };
}
