import fs from 'fs';
import crypto from 'crypto';
import yaml from 'js-yaml';
import { Node } from '@markdoc/markdoc';
import { MarkdocParser } from './MarkdocParser';
import { ArticleBuildInfo, MetadataPlugin } from './types';
import { ArticleMetadata } from '../src/types';

type ArticleBuildInfoFactoryConfig = {
  basePath: string;
  contentPath: string;
  markdocParser: MarkdocParser;
  metadataPlugins: MetadataPlugin[];
};

export class ArticleBuildInfoFactory {
  basePath: string;
  contentPath: string;
  markdocParser: MarkdocParser;
  metadataPlugins: MetadataPlugin[];

  constructor(config: ArticleBuildInfoFactoryConfig) {
    this.basePath = config.basePath;
    this.contentPath = config.contentPath;
    this.markdocParser = config.markdocParser;
    this.metadataPlugins = config.metadataPlugins;
  }

  async create(filename: string): Promise<ArticleBuildInfo> {
    const text = await fs.promises.readFile(filename, { encoding: 'utf8' });
    const ast = this.markdocParser.parse(text);

    const chunkId = filename.replace(`${this.basePath}/`, '');
    const metadata = await this.getMetadata(ast);
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

  private async getMetadata(ast: Node) {
    let metadata: any = {};

    if (ast.attributes.frontmatter) {
      const frontmatter = yaml.load(ast.attributes.frontmatter) as any;
      metadata = { ...frontmatter };
    }

    for (const plugin of this.metadataPlugins) {
      const values = await plugin({ ast, metadata });
      if (values) {
        metadata = { ...metadata, ...values };
      }
    }

    return metadata;
  }

  private getPath(filename: string) {
    const tokens = filename.replace(this.contentPath, '').replace('.md', '').split('/');
    const isIndex = tokens[tokens.length - 1] === 'index';
    const pathTokens = isIndex ? tokens.slice(0, -1) : tokens;
    return '/' + pathTokens.join('/');
  }
}
