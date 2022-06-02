import crypto from 'crypto';
import yaml from 'js-yaml';
import { Node } from '@markdoc/markdoc';
import { MetadataPlugin } from './types';

export class ArticleFactory {
  contentPath: string;
  metadataPlugins: MetadataPlugin[];

  constructor(contentPath: string, metadataPlugins: MetadataPlugin[]) {
    this.contentPath = contentPath;
    this.metadataPlugins = metadataPlugins;
  }

  createArticle(id: string, ast: Node) {
    const metadata = this.getMetadata(ast);
    const hash = this.getHash(ast, metadata);
    const path = this.getPath(id);
    return { id, path, hash, metadata };
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

  private getPath(id: string) {
    const tokens = id.replace(this.contentPath, '').replace('.md', '').split('/');
    const isIndex = tokens[tokens.length - 1] === 'index';
    const pathTokens = isIndex ? tokens.slice(0, -1) : tokens;
    return '/' + pathTokens.join('/');
  }
}
