import { EventEmitter } from 'events';
import chokidar, { FSWatcher } from 'chokidar';
import glob from 'fast-glob';
import { ArticleFactory } from './ArticleFactory';
import { Article } from './types';

type CatalogBuilderConfig = {
  contentPath: string;
  articleFactory: ArticleFactory;
};

export class CatalogBuilder extends EventEmitter {
  contentPath: string;
  articleFactory: ArticleFactory;
  globPattern: string;
  fsWatcher: FSWatcher;
  articles: Record<string, Article>;

  constructor(config: CatalogBuilderConfig) {
    super();
    this.contentPath = config.contentPath;
    this.articleFactory = config.articleFactory;
    this.globPattern = `${this.contentPath}**/*.md`;
  }

  async read() {
    if (!this.articles) {
      const filenames = await glob(this.globPattern, { absolute: true });

      this.articles = {};
      for (const filename of filenames) {
        const article = await this.articleFactory.create(filename);
        this.articles[article.filename] = article;
      }
    }

    return Object.values(this.articles);
  }

  async startWatching() {
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

  private async addArticle(filename: string) {
    const article = await this.articleFactory.create(filename);
    this.articles[article.filename] = article;
    this.emit('add', article);
  }

  private async updateArticle(filename: string) {
    const article = await this.articleFactory.create(filename);

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
