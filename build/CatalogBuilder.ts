import { EventEmitter } from 'events';
import chokidar, { FSWatcher } from 'chokidar';
import glob from 'fast-glob';
import { ArticleBuildInfoFactory } from './ArticleBuildInfoFactory';
import { ArticleBuildInfo } from './types';

type CatalogBuilderConfig = {
  contentPath: string;
  articleBuildInfoFactory: ArticleBuildInfoFactory;
};

export class CatalogBuilder extends EventEmitter {
  contentPath: string;
  articleBuildInfoFactory: ArticleBuildInfoFactory;
  globPattern: string;
  articles: Record<string, ArticleBuildInfo>;
  initialScanComplete: boolean;
  fsWatcher?: FSWatcher;

  constructor(config: CatalogBuilderConfig) {
    super();
    this.contentPath = config.contentPath;
    this.articleBuildInfoFactory = config.articleBuildInfoFactory;
    this.globPattern = `${this.contentPath}**/*.md`;
    this.articles = {};
    this.initialScanComplete = false;
  }

  async get(id: string) {
    if (!this.initialScanComplete) {
      await this.performInitialScan();
    }

    return this.articles[id];
  }

  async read() {
    if (!this.initialScanComplete) {
      await this.performInitialScan();
    }

    return Object.values(this.articles);
  }

  async startWatching() {
    await this.performInitialScan();

    return new Promise<void>((resolve) => {
      this.fsWatcher = chokidar.watch(this.globPattern, {
        persistent: true,
        ignoreInitial: true,
      });

      this.fsWatcher.on('add', (filename) => this.addArticle(filename));
      this.fsWatcher.on('change', (filename) => this.updateArticle(filename));
      this.fsWatcher.on('unlink', (filename) => this.removeArticle(filename));
      this.fsWatcher.on('ready', resolve);
    });
  }

  async stopWatching() {
    return this.fsWatcher?.close();
  }

  private async performInitialScan() {
    const filenames = await glob(this.globPattern, { absolute: true });

    for (const filename of filenames) {
      const article = await this.articleBuildInfoFactory.create(filename);
      this.articles[article.filename] = article;
    }

    this.initialScanComplete = true;
  }

  private async addArticle(filename: string) {
    const article = await this.articleBuildInfoFactory.create(filename);
    this.articles[article.filename] = article;
    this.emit('add', article);
  }

  private async updateArticle(filename: string) {
    const article = await this.articleBuildInfoFactory.create(filename);

    const previous = this.articles[article.filename];
    const changed = !previous || previous.hash !== article.hash;

    this.articles[article.filename] = article;

    if (changed) {
      this.emit('change', article);
    }
  }

  private async removeArticle(filename: string) {
    const article = this.articles[filename];
    if (article) {
      delete this.articles[filename];
      this.emit('remove', article);
    }
  }
}
