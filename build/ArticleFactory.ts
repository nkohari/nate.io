import fs from 'fs';
import crypto from 'crypto';
import yaml from 'js-yaml';
import { Node } from '@markdoc/markdoc';
import { MarkdocParser } from './MarkdocParser';
import { Article, MetadataPlugin } from './types';

type ArticleManifestBuilderConfig = {
  basePath: string;
  contentPath: string;
  markdocParser: MarkdocParser;
  metadataPlugins: MetadataPlugin[];
};

export class ArticleFactory {
  basePath: string;
  contentPath: string;
  markdocParser: MarkdocParser;
  metadataPlugins: MetadataPlugin[];

  constructor(config: ArticleManifestBuilderConfig) {
    this.basePath = config.basePath;
    this.contentPath = config.contentPath;
    this.markdocParser = config.markdocParser;
    this.metadataPlugins = config.metadataPlugins;
  }

  async create(filename: string): Promise<Article> {
    const text = await fs.promises.readFile(filename, { encoding: 'utf8' });
    const ast = this.markdocParser.parse(text);

    const chunkId = filename.replace(`${this.basePath}/`, '');
    const metadata = this.getMetadata(ast);
    const hash = this.getHash(ast, metadata);
    const path = this.getPath(filename);

    return {
      ast,
      chunkId,
      filename,
      hash,
      metadata,
      path,
    };
  }

  private getHash(ast: Node, metadata: any) {
    const text = JSON.stringify({ ast, metadata });
    return crypto.createHash('sha256').update(text).digest('hex').substring(0, 8);
  }

  private getMetadata(ast: Node) {
    const frontmatter = ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {};

    return this.metadataPlugins.reduce((metadata, plugin) => {
      const values = plugin({ ast, metadata });
      if (values) {
        return { ...metadata, ...values };
      } else {
        return metadata;
      }
    }, frontmatter);
  }

  private getPath(filename: string) {
    const tokens = filename.replace(this.contentPath, '').replace('.md', '').split('/');
    const isIndex = tokens[tokens.length - 1] === 'index';
    const pathTokens = isIndex ? tokens.slice(0, -1) : tokens;
    return '/' + pathTokens.join('/');
  }
}
